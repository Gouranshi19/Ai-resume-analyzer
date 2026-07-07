import time
from jose import jwt

payload = {
    "sub": "google-oauth2|testuser123",
    "email": "testuser@gmail.com",
    "name": "Test User",
    "exp": int(time.time()) + 3600,
    "iss": "https://dev-kiloo1125bd5ycvu.us.auth0.com/",
    "aud": "https://cv-insight-api"
}

token = jwt.encode(payload, 'secret', algorithm='HS256')
print("BEARER TOKEN IS:")
print(f"Bearer {token}")