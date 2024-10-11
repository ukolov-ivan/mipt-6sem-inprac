from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Project(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    contributors = models.ManyToManyField(User, related_name="contributed_projects", through="Contributorship")  # type: ignore


class Contributorship(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # user_status = ...
    # user_role = ...

    class Meta:
        unique_together = ("user", "project")


class Issue(models.Model):
    ISSUE_STATUS = (
        ("P", "Pending"),
        ("IP", "In Progress"),
        ("D", "Done"),
    )

    title = models.CharField(max_length=255)
    description = models.TextField(default="")
    status = models.CharField(max_length=31, choices=ISSUE_STATUS, default="P")
    # urgency = ...
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reported_issues")
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="assigned_issues")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True)


class Comment(models.Model):
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
