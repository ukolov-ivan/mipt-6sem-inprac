from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.forms.utils import ErrorList
from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ["email", "username", "first_name", "last_name"]  # type: ignore
        error_class = "error"  # type:ignore


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ["email", "username", "first_name", "last_name"]
        error_class = "error"
