from rest_framework import serializers
from .models import Resume
import os

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = "__all__"
        read_only_fields = ["user", "uploaded_at"]

    def validate_file(self, value):
        ext = os.path.splitext(value.name)[1].lower()

        if ext not in [".pdf", ".docx"]:
            raise serializers.ValidationError(
                "Only PDF and DOCX files are allowed."
            )

        return value