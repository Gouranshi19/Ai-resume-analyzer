import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
from jose import jwt, JWTError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()


class Auth0JWTAuthentication(BaseAuthentication):
    """
    Custom DRF Authentication class to validate Auth0 RS256 JWT tokens
    and auto-synchronize users into the local PostgreSQL database.
    """

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None

        parts = auth_header.split()
        if parts[0].lower() != "bearer" or len(parts) != 2:
            raise AuthenticationFailed("Invalid Authorization header format. Expected 'Bearer <token>'.")

        token = parts[1]
        payload = self._verify_token(token)
        user = self._get_or_create_user(payload)
        
        return (user, token)

    def _get_jwks(self):
        """
        Fetches JWKS from Auth0 with a 24-hour cache layer 
        to avoid redundant network requests.
        """
        cache_key = "auth0_jwks_keys"
        jwks = cache.get(cache_key)
        
        if not jwks:
            jwks_url = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
            try:
                response = requests.get(jwks_url, timeout=5)
                response.raise_for_status()
                jwks = response.json()
                # Cache public keys for 24 hours (86400 seconds)
                cache.set(cache_key, jwks, 86400)
            except requests.RequestException as e:
                raise AuthenticationFailed(f"Failed to fetch public signing keys from identity provider: {str(e)}")
        
        return jwks

    def _verify_token(self, token):
        """
        Decodes and validates the JWT signature, issuer, audience, and expiration.
        """
        try:
            unverified_header = jwt.get_unverified_header(token)
        except JWTError:
            raise AuthenticationFailed("Invalid token layout or structure.")

        jwks = self._get_jwks()
        rsa_key = {}
        
        for key in jwks.get("keys", []):
            if key.get("kid") == unverified_header.get("kid"):
                rsa_key = {
                    "kty": key.get("kty"),
                    "kid": key.get("kid"),
                    "use": key.get("use"),
                    "n": key.get("n"),
                    "e": key.get("e")
                }
                break

        if not rsa_key:
            raise AuthenticationFailed("Appropriate public key not found in identity provider JWKS.")

        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=["RS256"],
                audience=settings.AUTH0_AUDIENCE,
                issuer=f"https://{settings.AUTH0_DOMAIN}/"
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token signature has expired.")
        except jwt.JWTClaimsError:
            raise AuthenticationFailed("Incorrect claims. Please check the audience and issuer configurations.")
        except JWTError as e:
            raise AuthenticationFailed(f"Token signature verification failed: {str(e)}")

    def _get_or_create_user(self, payload):
        """
        Retrieves an existing user or creates a new one, keeping profile fields 
        in sync while optimizing database writes.
        """
        auth0_id = payload.get("sub")
        if not auth0_id:
            raise AuthenticationFailed("Token payload missing subject identifier ('sub').")

        email = payload.get("email")
        # Extract metadata fallback securely if provided by Auth0
        first_name = payload.get("given_name", payload.get("first_name", ""))
        last_name = payload.get("family_name", payload.get("last_name", ""))

        user, created = User.objects.get_or_create(username=auth0_id)
        is_dirty = False

        if created:
            is_dirty = True

        # Strategic field syncing only when differences are present
        if email and user.email != email:
            user.email = email
            is_dirty = True
        if first_name and user.first_name != first_name:
            user.first_name = first_name
            is_dirty = True
        if last_name and user.last_name != last_name:
            user.last_name = last_name
            is_dirty = True

        if is_dirty:
            user.save()

        return user