from django.urls import path

from .views import (
    get_wishlist,
    add_to_wishlist,
    remove_from_wishlist,
)

urlpatterns = [
    path("", get_wishlist),
    path("add/", add_to_wishlist),
    path("remove/<int:pk>/", remove_from_wishlist),
]
