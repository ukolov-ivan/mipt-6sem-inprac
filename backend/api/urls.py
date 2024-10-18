from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),
    path("api/v1/", include("users.urls")),
    path("api/v1/", include("projects.urls")),
]


admin.site.site_header = "Project Management Software Admin"  # placeholder
admin.site.site_title = "Project Management Software Administration"  # placeholder
admin.site.index_title = "Project Management Software Administration"  # placeholder
