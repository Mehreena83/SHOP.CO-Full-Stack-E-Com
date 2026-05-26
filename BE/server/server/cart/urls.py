from django.urls import path

from .views import get_cart, add_to_cart, remove_from_cart, update_cart_quantity

urlpatterns = [
    path("", get_cart),
    path("add/", add_to_cart),
    path("update/<int:id>/", update_cart_quantity),
    path("remove/<int:id>/", remove_from_cart),
]
