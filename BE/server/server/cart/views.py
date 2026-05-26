from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status

from .models import CartItem
from .serializers import CartSerializer

from products.models import Product


# GET USER CART
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):

    items = CartItem.objects.filter(user=request.user)

    serializer = CartSerializer(items, many=True, context={"request": request})

    return Response(serializer.data)


# ADD PRODUCT TO CART
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    product_id = request.data.get("product_id")

    quantity = request.data.get("quantity", 1)

    try:
        product = Product.objects.get(id=product_id)

    except Product.DoesNotExist:

        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )

    size = request.data.get("size")
    color = request.data.get("color")

    cart_item, created = CartItem.objects.get_or_create(
        user=request.user, product=product, size=size, color=color
    )

    if not created:
        cart_item.quantity += int(quantity)

    else:
        cart_item.quantity = int(quantity)

    cart_item.save()

    serializer = CartSerializer(cart_item, context={"request": request})

    return Response(serializer.data, status=status.HTTP_201_CREATED)


# UPDATE CART QUANTITY
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request, id):

    try:

        item = CartItem.objects.get(id=id, user=request.user)

        quantity = request.data.get("quantity")

        item.quantity = quantity

        item.save()

        serializer = CartSerializer(item, context={"request": request})

        return Response(serializer.data)

    except CartItem.DoesNotExist:

        return Response({"error": "Item not found"}, status=404)


# REMOVE ITEM FROM CART
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, id):

    try:
        item = CartItem.objects.get(id=id, user=request.user)

        item.delete()

        return Response({"message": "Item removed"})

    except CartItem.DoesNotExist:

        return Response(
            {"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
        )
