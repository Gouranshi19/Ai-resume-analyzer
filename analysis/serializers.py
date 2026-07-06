from rest_framework import serializers
from .models import Analysis
from resumes.models import Resume


class AnalysisRequestSerializer(serializers.Serializer):
    """Validates incoming data when a user requests a new analysis."""
    resume_id = serializers.IntegerField()
    job_description = serializers.CharField(allow_blank=False)

    def validate_resume_id(self, value):
        request = self.context.get("request")
        if not Resume.objects.filter(pk=value, user=request.user).exists():
            raise serializers.ValidationError(
                "Resume not found or does not belong to you."
            )
        return value

    def validate_job_description(self, value):
        if len(value.strip()) < 30:
            raise serializers.ValidationError(
                "Job description is too short for a meaningful analysis."
            )
        return value


class AnalysisSerializer(serializers.ModelSerializer):
    resume_title = serializers.CharField(source="resume.title", read_only=True)

    class Meta:
        model = Analysis
        fields = [
            "id",
            "resume",
            "resume_title",
            "job_description",
            "ats_score",
            "matched_keywords",
            "missing_keywords",
            "ai_suggestions",
            "created_at",
        ]
        read_only_fields = fields