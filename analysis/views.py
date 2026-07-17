

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from resumes.models import Resume
from .models import Analysis
from .serializers import AnalysisSerializer, AnalysisRequestSerializer
from .services.text_extraction import extract_resume_text, TextExtractionError
from .services.keyword_matching import match_keywords
from .services.gemini_client import get_ai_suggestions, GeminiError


class AnalysisCreateListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request_serializer = AnalysisRequestSerializer(
            data=request.data, context={"request": request}
        )
        if not request_serializer.is_valid():
            return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        resume_id = request_serializer.validated_data["resume_id"]
        job_description = request_serializer.validated_data["job_description"]
        resume = get_object_or_404(Resume, pk=resume_id, user=request.user)

        try:
            resume_text = extract_resume_text(resume)
        except TextExtractionError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        match_result = match_keywords(resume_text, job_description)

        try:
            ai_suggestions = get_ai_suggestions(
                resume_text=resume_text,
                job_description=job_description,
                ats_score=match_result["ats_score"],
                matched_keywords=match_result["matched_keywords"],
                missing_keywords=match_result["missing_keywords"],
            )
        except GeminiError as exc:
            # Keyword score is still useful even if the AI call fails
            ai_suggestions = f"AI suggestions unavailable right now: {exc}"

        analysis = Analysis.objects.create(
            user=request.user,
            resume=resume,
            job_description=job_description,
            ats_score=match_result["ats_score"],
            matched_keywords=match_result["matched_keywords"],
            missing_keywords=match_result["missing_keywords"],
            ai_suggestions=ai_suggestions,
        )

        serializer = AnalysisSerializer(analysis)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        analyses = Analysis.objects.filter(user=request.user)
        serializer = AnalysisSerializer(analyses, many=True)
        return Response(serializer.data)


class AnalysisDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        analysis = get_object_or_404(Analysis, pk=pk, user=request.user)
        serializer = AnalysisSerializer(analysis)
        return Response(serializer.data)
    
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resumes = Resume.objects.filter(user=request.user)
        analyses = Analysis.objects.filter(user=request.user)

        latest_analysis = analyses.first()

        data = {
            "total_resumes": resumes.count(),
            "total_analyses": analyses.count(),
            "latest_score": latest_analysis.ats_score if latest_analysis else 0,
        }

        return Response(data)