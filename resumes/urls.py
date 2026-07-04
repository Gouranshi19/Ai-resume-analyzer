from django.urls import path
from .views import ( ResumeUploadView, ResumeListView, ResumeDetailDeleteView, )

urlpatterns = [
    path("upload/", ResumeUploadView.as_view()),
    path("", ResumeListView.as_view()),
    path("<int:pk>/", ResumeDetailDeleteView.as_view()),
]