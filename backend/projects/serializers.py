from rest_framework import serializers

from .models import Comment, Contributorship, Issue, Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        extra_kwargs = {"owner": {"required": False}}


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = "__all__"
        extra_kwargs = {"reporter": {"required": False}}


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class ContributorshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contributorship
        fields = "__all__"
