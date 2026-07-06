import re

STOPWORDS = {
    "a", "about", "above", "after", "again", "all", "also", "am", "an", "and",
    "any", "are", "as", "at", "be", "because", "been", "before", "being",
    "below", "between", "both", "but", "by", "can", "could", "did", "do",
    "does", "doing", "down", "during", "each", "etc", "few", "for", "from",
    "further", "had", "has", "have", "having", "he", "her", "here", "hers",
    "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is",
    "it", "its", "itself", "me", "more", "most", "must", "my", "myself",
    "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or",
    "other", "our", "ours", "ourselves", "out", "over", "own", "same",
    "she", "should", "so", "some", "such", "than", "that", "the", "their",
    "theirs", "them", "themselves", "then", "there", "these", "they",
    "this", "those", "through", "to", "too", "under", "until", "up",
    "very", "was", "we", "were", "what", "when", "where", "which", "while",
    "who", "whom", "why", "will", "with", "would", "you", "your", "yours",
    "yourself", "yourselves", "experience", "years", "strong", "using",
    "work", "working", "ability",
}


def _tokenize(text):
    words = re.findall(r"[a-zA-Z][a-zA-Z0-9+.#-]{1,}", text.lower())
    cleaned = [w.strip(".,-") for w in words]
    return [w for w in cleaned if w and w not in STOPWORDS and len(w) > 2]


def extract_keywords(text, top_n=40):
    """Frequency-ranked candidate keywords from a job description."""
    tokens = _tokenize(text)
    freq = {}
    for t in tokens:
        freq[t] = freq.get(t, 0) + 1
    ranked = sorted(freq.items(), key=lambda x: (-x[1], x[0]))
    return [word for word, _ in ranked[:top_n]]


def match_keywords(resume_text, job_description):
    jd_keywords = extract_keywords(job_description)
    resume_tokens = set(_tokenize(resume_text))

    matched = [kw for kw in jd_keywords if kw in resume_tokens]
    missing = [kw for kw in jd_keywords if kw not in resume_tokens]

    score = round((len(matched) / len(jd_keywords)) * 100, 2) if jd_keywords else 0.0

    return {
        "ats_score": score,
        "matched_keywords": matched,
        "missing_keywords": missing,
    }