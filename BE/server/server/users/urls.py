from django.urls import path
from .views import register_user, ForgotPasswordView, ResetPasswordView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", register_user),
    path("login/", TokenObtainPairView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    path("forgot-password/", ForgotPasswordView.as_view()),
    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordView.as_view(),
    ),
]
