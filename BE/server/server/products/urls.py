from django.urls import path

from .views import (
    get_products,
    get_product,
    get_categories,
    update_product,
    delete_product,
)

urlpatterns = [
    path("", get_products),
    path("categories/", get_categories),
    path("update/<slug:slug>/", update_product),
    path("delete/<slug:slug>/", delete_product),
    path("<slug:slug>/", get_product),
]
