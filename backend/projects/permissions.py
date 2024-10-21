from rest_framework import permissions

from .models import Project


class IsContributor(permissions.BasePermission):
    def has_permission(self, request, view):
        project_id = view.kwargs.get("project_id")
        if not project_id:
            return False

        return request.user.is_authenticated and request.user.contributed_projects.filter(id=project_id).exists()


class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        project_id = view.kwargs.get("project_id")
        if not project_id:
            return False

        return request.user.is_authenticated and (Project.objects.get(pk=project_id).owner == request.user.id)
