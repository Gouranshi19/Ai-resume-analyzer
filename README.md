# CV Insight AI — Resume Analyzer & ATS Feedback Platform

An AI-powered resume analyzer that provides ATS scoring, keyword analysis, and improvement suggestions based on job descriptions.

## Tech Stack

**Backend:** Django, Django REST Framework, JWT Authentication

**Frontend:** React.js, Vite, Axios, React Router

**AI:** Google Gemini API

**Auth:** JWT + Google SSO

**Database:** PostgreSQL


---

## Team Members & Roles

| Member | Role |
|----------|----------|
| Gargeek Nama | Team Lead, Frontend |
| Ajay Singh | Authentication |
| Gouranshi | Backend & AI Integration |
| Anushka Goyal | Backend & AI Integration |
| Aashish Meena | Database Management |

---

## API Endpoints

### Authentication

- `POST /api/auth/register/` — Register
- `POST /api/auth/login/` — JWT Login
- `POST /api/auth/google/` — Google SSO
- `POST /api/auth/token/refresh/` — Refresh Token

### Resume

- `POST /api/resumes/upload/` — Upload Resume
- `GET /api/resumes/` — List Resumes
- `GET /api/resumes/<id>/` — Get Resume Details
- `DELETE /api/resumes/<id>/` — Delete Resume

### Analysis

- `POST /api/analysis/` — Analyze Resume
- `GET /api/analysis/` — List Analyses
- `GET /api/analysis/<id>/` — Get Analysis Details

---

## Current Status

### Completed

- Django project setup
- Custom User model
- Resume model
- Resume serializer
- Resume upload API
- Resume history/list API
- Initial frontend setup

### In Progress

- JWT Authentication
- Database configuration
- Google SSO
- Gemini API integration

---

## Planned Features

- Resume Upload
- ATS Score Generation
- Keyword Gap Analysis
- AI-Powered Suggestions
- Resume History
- Google SSO Login
- User Dashboard


## Backend Setup

### 1. Clone

git clone <repo>

### 2. Go to backend

cd cv-insight-ai

### 3. Create virtual environment

python -m venv venv

### 4. Activate

Windows

venv\Scripts\activate

Linux

source venv/bin/activate

### 5. Install packages

pip install -r requirements.txt

### 6. Copy

.env.example

to

.env

Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey) and set it in the backend `.env` file:

```env
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-3.5-flash-lite
```

Keep this key on the backend; do not put it in the frontend's `cv-grid/.env` or commit it to source control. Restart Django after adding the key.

### 7. Configure PostgreSQL

DB_NAME=cv_insight_db

### 8. Run migrations

python manage.py migrate

### 9. Start server

python manage.py runserver


## Frontend Setup

From the repository root, configure `cv-grid/.env` using `cv-grid/.env.example`, install frontend dependencies, and run the Vite development server:

```sh
cd cv-grid
npm install
npm run dev
```

Set `VITE_API_URL` to the backend API base URL ending in `/api` and set `VITE_GOOGLE_CLIENT_ID` to the same Google OAuth client ID configured in the backend. These values are embedded in the public frontend bundle; never place `GEMINI_API_KEY` or other server secrets in frontend environment variables.

## Deployment Configuration

Deploy the Django API and Vite frontend as separate services. Set `DEBUG=False` on the backend, generate a unique `SECRET_KEY`, configure `ALLOWED_HOSTS` with backend hostnames, and set `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` to the HTTPS frontend origin. Provide PostgreSQL connection values, `GOOGLE_CLIENT_ID`, and `GEMINI_API_KEY` in the backend service environment. Set the frontend build variables `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` in its hosting provider. The backend defaults to HTTPS redirects, secure cookies, and one year of HSTS when `DEBUG=False`; if TLS terminates at a trusted reverse proxy, configure `TRUST_PROXY_SSL=True` only when that proxy sets `X-Forwarded-Proto` safely.

Run `python manage.py migrate` during release and serve `staticfiles/` through the host or a static-file middleware. Uploaded resumes are stored under `MEDIA_ROOT`; configure persistent or object storage before deploying to an ephemeral filesystem, since local uploads otherwise may be lost on restart. The Vercel rewrite in `cv-grid/vercel.json` supports client-side routes.
