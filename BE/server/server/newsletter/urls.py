from django.urls import path

from .views import newsletter_subscribe

urlpatterns = [
    path("newsletter/", newsletter_subscribe),
]
