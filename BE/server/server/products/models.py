from django.db import models

# Create your models here.

from django.db import models
from django.utils.text import slugify


class Category(models.Model):

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products",
        null=True,
        blank=True,
    )

    name = models.CharField(max_length=255)

    slug = models.SlugField(unique=True, blank=True)

    description = models.TextField(blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)

    old_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    image = models.ImageField(upload_to="products/", null=True, blank=True)

    stock = models.IntegerField(default=0)

    rating = models.FloatField(default=0)

    is_new = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)
    sizes = models.JSONField(default=list)
    colors = models.JSONField(default=list)
    faq = models.JSONField(default=list)
    reviews = models.JSONField(default=list)

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
