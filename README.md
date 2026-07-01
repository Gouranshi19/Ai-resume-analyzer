CV Insight AI — Resume Analyzer & ATS Feedback Platform

An AI-powered resume analyzer that provides ATS scoring, keyword analysis, and improvement suggestions based on job descriptions.

Tech Stack

Backend: Django, Django REST Framework, JWT Authentication
Frontend: React.js, Vite, Axios, React Router
AI: Google Gemini API
Auth: JWT + Google SSO
Database: To Be Finalized (PostgreSQL/MySQL)
Deployment: Render (Backend), Vercel (Frontend)


Team Members & Roles

Gargeek Nama   → Team Lead, Frontend
Ajay Singh     → Authentication
Gouranshi      → Backend & AI Integration
Anushka Goyal  → Backend & AI Integration
Aashish Meena  → Database Management


API Endpoints

Auth
- POST /api/auth/register/ — Register
- POST /api/auth/login/ — JWT Login
- POST /api/auth/google/ — Google SSO
- POST /api/auth/token/refresh/ — Refresh token

Resume
- POST /api/resumes/upload/ — Upload resume
- GET /api/resumes/ — List resumes
- GET /api/resumes/<id>/ — Single resume
- DELETE /api/resumes/<id>/ — Delete resume

Analysis
- POST /api/analysis/ — Analyze resume against job description
- GET /api/analysis/ — List past analyses
- GET /api/analysis/<id>/ — Single analysis result


Current Status

Completed
- Django project setup
- Custom User model
- Resume model
- Resume serializer
- Resume upload API
- Resume history/list API
- Initial frontend setup

In Progress
- JWT Authentication
- Database configuration
- Google SSO
- Gemini API integration