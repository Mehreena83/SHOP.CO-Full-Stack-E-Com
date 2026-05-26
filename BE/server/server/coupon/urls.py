from django.urls import path
from .views import apply_coupon

urlpatterns = [
    path("apply-coupon/", apply_coupon),
]
