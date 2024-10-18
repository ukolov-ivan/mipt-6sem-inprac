from django.db.models.query import QuerySet
from rest_framework import permissions, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import Comment, Contributorship, Issue, Project
from .serializers import (
    CommentSerializer,
    ContributorshipSerializer,
    IssueSerializer,
    ProjectSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet[Project]):
    queryset: QuerySet[Project] = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class IssueViewSet(viewsets.ModelViewSet[Issue]):
    queryset: QuerySet[Issue] = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get("project_pk")
        return self.queryset.filter(project_id=project_id)

    def perform_create(self, serializer, **kwargs):
        serializer.save(reporter=self.request.user)


class CommentViewSet(viewsets.ModelViewSet[Comment]):
    queryset: QuerySet[Comment] = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> QuerySet[Comment]:
        raise NotImplementedError(...)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ContributorshipViewSet(viewsets.ModelViewSet[Contributorship]):
    queryset: QuerySet[Contributorship] = Contributorship.objects.all()
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
        except Contributorship.DoesNotExist as exc:
            raise NotFound(detail="Contributor not found.", code="404") from exc
