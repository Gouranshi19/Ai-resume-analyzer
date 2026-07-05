import requests
from django.contrib.auth import get_user_model
from jose import jwt
from rest_framework import authentication, exceptions
from django.conf import settings

User = get_user_model()

class Auth0JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return None

        parts = auth_header.split()
        if parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Authorization header must start with Bearer')
        elif len(parts) == 1:
            raise exceptions.AuthenticationFailed('Token not found')
        elif len(parts) > 2:
            raise exceptions.AuthenticationFailed('Authorization header must be Bearer token')

        token = parts[1]
        payload = self.verify_jwt(token)
        user = self.get_or_create_user(payload)
        return (user, token)

    def verify_jwt(self, token):
        try:
            jwks_url = f'https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json'
            jwks = requests.get(jwks_url).json()
            
            unverified_header = jwt.get_unverified_header(token)
            rsa_key = {}
            
            for key in jwks['keys']:
                if key['kid'] == unverified_header['kid']:
                    rsa_key = {
                        'kty': key['kty'],
                        'kid': key['kid'],
                        'use': key['use'],
                        'n': key['n'],
                        'e': key['e']
                    }
            
            if rsa_key:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=['RS256'],
                    audience=settings.AUTH0_AUDIENCE,
                    issuer=f'https://{settings.AUTH0_DOMAIN}/'
                )
                return payload
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.JWTClaimsError:
            raise exceptions.AuthenticationFailed('Incorrect claims, please check the audience and issuer')
        except Exception:
            raise exceptions.AuthenticationFailed('Unable to parse authentication token')

        raise exceptions.AuthenticationFailed('Unable to find appropriate key')

    def get_or_create_user(self, payload):
        auth0_user_id = payload.get('sub')
        if not auth0_user_id:
            raise exceptions.AuthenticationFailed('Invalid token payload: missing subject')

        username = auth0_user_id
        user, created = User.objects.get_or_create(username=username)
        
        email = payload.get('email')
        if email and user.email != email:
            user.email = email
            user.save()

        return user