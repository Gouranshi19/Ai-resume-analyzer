from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

import os

from django.conf import settings
from django.contrib.auth import get_user_model

from google.oauth2 import id_token
from google.auth.transport import requests

from .serializers import (
    CurrentUserSerializer,
    LoginSerializer,
    RegisterSerializer,
    token_response,
)


class CurrentUserView(APIView):
    """Return the identity details for the authenticated user."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(CurrentUserSerializer(request.user).data)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(token_response(user), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            print("REQUEST:", request.data)

            serializer = LoginSerializer(
                data=request.data,
                context={"request": request},
            )

            serializer.is_valid(raise_exception=True)
            print("Serializer OK")

            user = serializer.validated_data["user"]
            print("User:", user.username)

            tokens = token_response(user)
            print("Tokens created")

            return Response(tokens)

        except Exception as e:
            print("LOGIN ERROR:", repr(e))
            raise
User = get_user_model()


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        token = request.data.get("token")

        if not token:
            return Response(
                {"error": "Token is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID,
            )

            email = idinfo["email"]

            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")

            user = User.objects.filter(email=email).first()

            if not user:

                username = email.split("@")[0]

                original = username
                i = 1

                while User.objects.filter(username=username).exists():
                    username = f"{original}{i}"
                    i += 1

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                )

            return Response(token_response(user))

        except Exception as e:

            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )