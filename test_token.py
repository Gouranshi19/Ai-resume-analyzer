"""Legacy local token helper. It is not a Django test module."""

if __name__ == "__main__":
    raise SystemExit(
        "This legacy Auth0 token generator is not valid for the app?s JWT authentication. "
        "Use the /api/auth/login/ endpoint to obtain a development token."
    )
