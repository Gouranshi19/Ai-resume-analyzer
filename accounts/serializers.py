from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class CurrentUserSerializer(serializers.ModelSerializer):
    """Safely output a verified user's identity details."""

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
        read_only_fields = fields


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, trim_whitespace=False)
    password = serializers.CharField(write_only=True, trim_whitespace=False)

    class Meta:
        model = User
        fields = ["username", "email", "password", "confirm_password"]

    def validate_email(self, value):
        email = value.strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("A user with this email address already exists.")
        return email

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        validate_password(attrs["password"])
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, write_only=True, trim_whitespace=True)
    email = serializers.EmailField(required=False, write_only=True)
    password = serializers.CharField(write_only=True, trim_whitespace=False)

    def validate(self, attrs):
        identifier = attrs.get("username") or attrs.get("email")
        password = attrs.get("password")
        if not identifier:
            raise serializers.ValidationError({"username": "Provide a username or email address."})

        user = User.objects.filter(email__iexact=identifier).first()
        username = user.username if user else identifier
        authenticated_user = authenticate(
            request=self.context.get("request"), username=username, password=password
        )
        if not authenticated_user or not authenticated_user.is_active:
            raise serializers.ValidationError({"detail": "Invalid username/email or password."})

        attrs["user"] = authenticated_user
        return attrs


def token_response(user):
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": CurrentUserSerializer(user).data,
    }