"""
Thin wrapper around Google Gemini for generating human-readable resume
feedback. keyword_matching.py gives the *score*; Gemini gives the
qualitative *advice* on top of it.

Requires GEMINI_API_KEY to be set in the environment (.env file, loaded
via python-dotenv which is already in requirements.txt).
"""
import os
import requests

GEMINI_API_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.0-flash:generateContent"
)


class GeminiError(Exception):
    pass


def _build_prompt(resume_text, job_description, ats_score, matched_keywords, missing_keywords):
    return f"""You are an expert career coach and ATS (Applicant Tracking System) specialist.

A candidate's resume was compared against a job description with these results:
- ATS keyword match score: {ats_score}%
- Matched keywords: {", ".join(matched_keywords) if matched_keywords else "None"}
- Missing keywords: {", ".join(missing_keywords) if missing_keywords else "None"}

Job Description:
\"\"\"{job_description}\"\"\"

Resume Text:
\"\"\"{resume_text}\"\"\"

Give the candidate clear, actionable feedback in this format:
1. Overall Summary (2-3 sentences)
2. Top 3 Strengths
3. Top 3 Gaps / Missing Skills to Address
4. 3-5 Specific Suggestions to improve ATS match and resume quality

Keep it concise, practical, and encouraging. Do not just repeat the raw keyword lists back."""


def get_ai_suggestions(resume_text, job_description, ats_score, matched_keywords, missing_keywords):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise GeminiError("GEMINI_API_KEY is not set in environment variables.")

    prompt = _build_prompt(
        resume_text, job_description, ats_score, matched_keywords, missing_keywords
    )
    payload = {"contents": [{"parts": [{"text": prompt}]}]}

    try:
        response = requests.post(
            f"{GEMINI_API_URL}?key={api_key}",
            json=payload,
            timeout=30,
        )
        response.raise_for_status()
    except requests.RequestException as exc:
        raise GeminiError(f"Gemini API request failed: {exc}")

    data = response.json()
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except (KeyError, IndexError):
        raise GeminiError("Unexpected response format from Gemini API.")