from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(source="product.name", read_only=True)

    product_image = serializers.ImageField(source="product.image", read_only=True)

    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "product_image",
            "quantity",
            "price",
            "size",
            "color",
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order

        fields = [
            "id",
            "full_name",
            "phone",
            "address",
            "city",
            "pincode",
            "payment_method",
            "status",
            "subtotal",
            "delivery_fee",
            "discount",
            "coupon_code",
            "total_price",
            "created_at",
            "items",
        ]
