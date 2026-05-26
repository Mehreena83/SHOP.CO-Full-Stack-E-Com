from django.urls import path

from .views import (
    create_order,
    get_orders,
    get_single_order,
    create_payment,
    cancel_order,
)

urlpatterns = [
    path("", get_orders),
    path("create/", create_order),
    path("<int:pk>/", get_single_order),
    path("create-payment/", create_payment),
    path("<int:pk>/cancel/", cancel_order),
]
