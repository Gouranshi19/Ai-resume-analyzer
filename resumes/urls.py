from django.urls import path
from .views import ResumeUploadView, ResumeListView

urlpatterns = [
    path("upload/", ResumeUploadView.as_view()),
    path("", ResumeListView.as_view()),
]