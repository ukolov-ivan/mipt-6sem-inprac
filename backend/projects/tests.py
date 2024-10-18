from django.contrib.auth import get_user_model
from django.db import models
from django.test import TestCase

from .models import Comment, Contributorship, Issue, Project

User = get_user_model()


class ProjectModelTest(TestCase):

    def setUp(self):
        self.credentials = {
            "username": "testuser",
            "first_name": "test",
            "last_name": "user",
            "password": "testpassword",
            "email": "testuser@example.com",
        }
        self.user = User.objects.create_user(**self.credentials)
        self.project = Project.objects.create(name="Test Project", owner=self.user)

    def test_project_creation(self):
        self.assertEqual(self.project.name, "Test Project")
        self.assertEqual(self.project.owner, self.user)

    def test_project_description_default(self):
        self.assertEqual(self.project.description, "")


class ContributorshipModelTest(TestCase):

    def setUp(self):
        self.credentials1 = {
            "username": "testuser1",
            "first_name": "test1",
            "last_name": "user1",
            "password": "testpassword",
            "email": "testuser1@example.com",
        }
        self.credentials2 = {
            "username": "testuser2",
            "first_name": "test2",
            "last_name": "user2",
            "password": "testpassword",
            "email": "testuser2@example.com",
        }
        self.user1 = User.objects.create_user(**self.credentials1)
        self.user2 = User.objects.create_user(**self.credentials2)
        self.project = Project.objects.create(name="Test Project", owner=self.user1)
        self.contributorship = Contributorship.objects.create(project=self.project, user=self.user2)

    def test_contributorship_creation(self):
        self.assertEqual(self.contributorship.project, self.project)
        self.assertEqual(self.contributorship.user, self.user2)

    def test_unique_together_constraint(self):
        with self.assertRaises(Exception):
            Contributorship.objects.create(project=self.project, user=self.user2)


class IssueModelTest(TestCase):

    def setUp(self):
        self.credentials1 = {
            "username": "testuser1",
            "first_name": "test1",
            "last_name": "user1",
            "password": "testpassword",
            "email": "testuser1@example.com",
        }
        self.credentials2 = {
            "username": "testuser2",
            "first_name": "test2",
            "last_name": "user2",
            "password": "testpassword",
            "email": "testuser2@example.com",
        }
        self.user1 = User.objects.create_user(**self.credentials1)
        self.user2 = User.objects.create_user(**self.credentials2)
        self.project = Project.objects.create(name="Test Project", owner=self.user1)
        self.issue = Issue.objects.create(
            title="Test Issue",
            description="This is a test issue",
            project=self.project,
            reporter=self.user1,
            assignee=self.user2,
        )

    def test_issue_creation(self):
        self.assertEqual(self.issue.title, "Test Issue")
        self.assertEqual(self.issue.status, "P")
        self.assertIsNotNone(self.issue.created_at)
