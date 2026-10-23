"""
Thin wrapper around Google Gemini for generating human-readable resume
feedback. keyword_matching.py gives the *score*; Gemini gives the
qualitative *advice* on top of it.

Requires GEMINI_API_KEY to be set in the environment (.env file, loaded
via python-dotenv which is already in requirements.txt).
"""
import os
import time
import requests

GEMINI_API_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "{model}:generateContent"
)


class GeminiError(Exception):
    pass


def _build_prompt(resume_text, job_description, ats_score, matched_keywords, missing_keywords):
    resume_excerpt = resume_text[:12000]
    job_description_excerpt = job_description[:8000]
    matched_excerpt = matched_keywords[:25]
    missing_excerpt = missing_keywords[:25]

    return f"""You are an expert career coach and ATS (Applicant Tracking System) specialist.

A candidate's resume was compared against a job description with these results:
- ATS keyword match score: {ats_score}%
- Matched keywords: {", ".join(matched_excerpt) if matched_excerpt else "None"}
- Missing keywords: {", ".join(missing_excerpt) if missing_excerpt else "None"}

Job Description:
\"\"\"{job_description_excerpt}\"\"\"

Resume Text:
\"\"\"{resume_excerpt}\"\"\"

Give the candidate clear, actionable feedback in this format:
1. Overall Summary (2-3 sentences)
2. Top 3 Strengths
3. Top 3 Gaps / Missing Skills to Address
4. 3-5 Specific Suggestions to improve ATS match and resume quality

Keep it concise, practical, and encouraging. Do not just repeat the raw keyword lists back. Limit the complete response to 250 words."""


def get_ai_suggestions(resume_text, job_description, ats_score, matched_keywords, missing_keywords):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise GeminiError("GEMINI_API_KEY is not set in environment variables.")

    model = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash-lite")

    prompt = _build_prompt(
        resume_text, job_description, ats_score, matched_keywords, missing_keywords
    )
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "maxOutputTokens": 1200,
            "thinkingConfig": {"thinkingLevel": "low"},
        },
    }

    for attempt in range(3):
        try:
            response = requests.post(
                GEMINI_API_URL.format(model=model),
                json=payload,
                headers={"x-goog-api-key": api_key},
                timeout=(5, 20),
            )
        except requests.Timeout as exc:
            raise GeminiError(
                "Gemini took longer than 20 seconds. Please retry suggestions."
            ) from exc
        except requests.RequestException as exc:
            if attempt >= 1:
                raise GeminiError(f"Gemini API request failed: {exc}") from exc
            time.sleep(1)
            continue

        if response.status_code in (408, 429, 500, 502, 503, 504) and attempt < 2:
            retry_after = response.headers.get("Retry-After")
            try:
                delay = min(float(retry_after), 8) if retry_after else 2**attempt
            except ValueError:
                delay = 2**attempt
            time.sleep(delay)
            continue

        try:
            response.raise_for_status()
        except requests.HTTPError as exc:
            try:
                detail = response.json().get("error", {}).get("message")
            except (ValueError, AttributeError):
                detail = response.text[:500]
            message = detail or response.reason or str(exc)
            raise GeminiError(
                f"Gemini API request failed ({response.status_code}): {message}"
            ) from exc
        break

    data = response.json()
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except (KeyError, IndexError):
        raise GeminiError("Unexpected response format from Gemini API.")
