from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, views
from rest_framework.response import Response

from .serializers import UserDetailSerializer

User = get_user_model()


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "pkid"


class UserLoginTestView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected endpoint for testing purposes"})
