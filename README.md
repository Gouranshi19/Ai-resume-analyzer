# CV Insight AI — Resume Analyzer & ATS Feedback Platform

An AI-powered resume analyzer that provides ATS scoring, keyword analysis, and improvement suggestions based on job descriptions.

## Tech Stack

**Backend:** Django, Django REST Framework, JWT Authentication

**Frontend:** React.js, Vite, Axios, React Router

**AI:** Google Gemini API

**Auth:** JWT + Auth0 + Google SSO

**Database:** To Be Finalized (PostgreSQL/MySQL)

**Deployment:** Render (Backend), Vercel (Frontend)

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
