from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Resume
from .serializers import ResumeSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id

        serializer = ResumeSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResumeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resumes = Resume.objects.filter(user=request.user)
        serializer = ResumeSerializer(resumes, many=True)
        return Response(serializer.data)
    

class ResumeDetailDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        resume = get_object_or_404(
            Resume,
            pk=pk,
            user=request.user
        )

        serializer = ResumeSerializer(resume)
        return Response(serializer.data)

    def delete(self, request, pk):
        resume = get_object_or_404(
            Resume,
            pk=pk,
            user=request.user
        )

        resume.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        resume = get_object_or_404(
            Resume,
            pk=pk,
            user=request.user
        )

        serializer = ResumeSerializer(
            resume,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)