from django.urls import path
from .views import (
    AnalysisCreateListView,
    AnalysisDetailView,
    DashboardStatsView,
)

urlpatterns = [
    path("", AnalysisCreateListView.as_view()),
    path("stats/", DashboardStatsView.as_view()),
    path("<int:pk>/", AnalysisDetailView.as_view()),
]