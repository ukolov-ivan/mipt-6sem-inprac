from django.urls import path

from .views import UserDetailView, UserLoginTestView

urlpatterns = [
    path("users/<int:pkid>", UserDetailView.as_view(), name="users-retreive"),
    path("users/test/", UserLoginTestView.as_view(), name="users-login-test"),
]
