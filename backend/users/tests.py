from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status, test

User = get_user_model()


class UserRegistrationTest(test.APITestCase):
    def setUp(self):
        self.credentials = {
            "username": "testuser",
            "first_name": "test",
            "last_name": "user",
            "password": "testpassword",
            "re_password": "testpassword",
            "email": "testuser@example.com",
        }
        self.get_response = lambda: self.client.post(reverse("user-list"), self.credentials, format="json")
        return super().setUp()

    def test_user_registration(self):
        response = self.get_response()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, self.credentials["username"])

    def test_user_registration_duplicate_username(self):
        self.get_response()
        response = self.get_response()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserLoginTest(test.APITestCase):
    def setUp(self):
        self.credentials = {
            "username": "testuser",
            "first_name": "test",
            "last_name": "user",
            "password": "testpassword",
            "email": "testuser@example.com",
        }
        self.user = User.objects.create_user(**self.credentials)
        self.get_response = lambda data=self.credentials: self.client.post(
            reverse("jwt-create"), data=data, format="json"
        )
        self.protected_endpoint = reverse("users-login-test")
        return super().setUp()

    def test_user_login_success(self):
        response = self.get_response()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_user_login_failure(self):
        data = {**self.credentials, "password": "wrongpassword"}
        response = self.get_response(data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        # self.assertIn("error", response.data)

    def test_token_authentication(self):
        response = self.get_response()
        token = response.data["access"]

        response = self.client.get(self.protected_endpoint, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_access_protected_endpoint_without_token(self):
        response = self.client.get(self.protected_endpoint)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
