"""
Extracts raw text from an uploaded resume file (PDF or DOCX).

Kept separate from models/views so the extraction strategy (e.g. adding
OCR for scanned PDFs later) can change without touching anything else.
"""
import os
from PyPDF2 import PdfReader
import docx


class TextExtractionError(Exception):
    pass


def extract_text_from_pdf(file_path):
    try:
        reader = PdfReader(file_path)
        text_parts = [page.extract_text() or "" for page in reader.pages]
        return "\n".join(text_parts).strip()
    except Exception as exc:
        raise TextExtractionError(f"Failed to read PDF: {exc}")


def extract_text_from_docx(file_path):
    try:
        document = docx.Document(file_path)
        return "\n".join(p.text for p in document.paragraphs).strip()
    except Exception as exc:
        raise TextExtractionError(f"Failed to read DOCX: {exc}")


def extract_resume_text(resume):
    """
    Returns text for a Resume instance.
    Uses resume.extracted_text if already cached, otherwise extracts
    it from the file and saves it back (so it's only ever done once
    per resume).
    """
    if resume.extracted_text:
        return resume.extracted_text

    file_path = resume.file.path
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        text = extract_text_from_pdf(file_path)
    elif ext == ".docx":
        text = extract_text_from_docx(file_path)
    else:
        raise TextExtractionError("Unsupported file type for extraction.")

    if not text:
        raise TextExtractionError(
            "Could not extract any text from this resume. "
            "The file may be scanned/image-based."
        )

    resume.extracted_text = text
    resume.save(update_fields=["extracted_text"])
    return text