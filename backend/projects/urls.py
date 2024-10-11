from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from .views import CommentViewSet, ContributorshipViewSet, IssueViewSet, ProjectViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet)

projects_router = routers.NestedDefaultRouter(router, r"projects", lookup="project")
projects_router.register(r"issues", IssueViewSet, basename="project-issues")
projects_router.register(r"contributors", ContributorshipViewSet, basename="project-contributors")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(projects_router.urls)),
    # router.register(r"comments", CommentViewSet)
]
