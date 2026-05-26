from django.db import models

# Create your models here.


from django.db import models
from django.contrib.auth.models import User

from products.models import Product


class CartItem(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity = models.IntegerField(default=1)

    size = models.CharField(max_length=20, blank=True, null=True)

    color = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name
