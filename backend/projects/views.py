from rest_framework import permissions, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import Comment, Contributorship, Issue, Project
from .permissions import IsContributor, IsOwner
from .serializers import (
    CommentSerializer,
    ContributorshipSerializer,
    IssueSerializer,
    ProjectSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet[Project]):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # project_id = kwargs.get("project_pk")
        serializer.save(owner=self.request.user)


class IssueViewSet(viewsets.ModelViewSet[Issue]):
    # queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get("project_pk")
        return Issue.objects.filter(project_id=project_id)

    def perform_create(self, serializer, **kwargs):
        # project_id = kwargs.get("project_pk")
        serializer.save(reporter=self.request.user)


class CommentViewSet(viewsets.ModelViewSet[Comment]):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ContributorshipViewSet(viewsets.ModelViewSet[Contributorship]):
    queryset = Contributorship.objects.all()
    serializer_class = ContributorshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get("project_pk")
        return Contributorship.objects.filter(project_id=project_id)

    def destroy(self, request, *args, **kwargs):
        # TODO -- name me better
        user_id = kwargs.get("pk")
        project_id = kwargs.get("project_pk")
        try:
            contributorship = self.queryset.get(user_id=user_id, project_id=project_id)
            contributorship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Contributorship.DoesNotExist:
            raise NotFound(detail="Contributor not found.", code=404)
