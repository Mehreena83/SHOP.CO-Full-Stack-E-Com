from django.contrib import admin

# Register your models here.

from django.contrib import admin

from .models import NewsletterSubscriber

admin.site.register(NewsletterSubscriber)
