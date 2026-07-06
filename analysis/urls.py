from django.urls import path
from .views import AnalysisCreateListView, AnalysisDetailView

urlpatterns = [
    path("", AnalysisCreateListView.as_view()),
    path("<int:pk>/", AnalysisDetailView.as_view()),
]