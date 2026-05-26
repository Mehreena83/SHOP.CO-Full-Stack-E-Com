from django.urls import path

from .views import (
    get_reviews,
    create_review,
)

urlpatterns = [
    path("<int:product_id>/", get_reviews),
    path("create/<int:product_id>/", create_review),
]
