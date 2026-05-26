from django.shortcuts import render

# Create your views here.


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status
from django.shortcuts import get_object_or_404
from decouple import config
from .models import Order, OrderItem
from .serializers import OrderSerializer

from cart.models import CartItem
import razorpay


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    cart_items = CartItem.objects.filter(user=request.user)

    if not cart_items.exists():

        return Response({"error": "Cart is empty"}, status=400)

    order = Order.objects.create(
        user=request.user,
        full_name=request.data.get("full_name"),
        phone=request.data.get("phone"),
        address=request.data.get("address"),
        city=request.data.get("city"),
        pincode=request.data.get("pincode"),
        payment_method=request.data.get("payment_method"),
        subtotal=request.data.get("subtotal", 0),
        delivery_fee=request.data.get("delivery_fee", 0),
        discount=request.data.get("discount", 0),
        coupon_code=request.data.get("coupon_code", ""),
        total_price=request.data.get("total_price", 0),
    )

    for item in cart_items:
        if item.product.stock < item.quantity:
            return Response(
                {"error": f"{item.product.name} is out of stock"}, status=400
            )

        item.product.stock -= item.quantity
        item.product.save()

        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            size=item.size,
            color=item.color,
            price=item.product.price,
        )

    cart_items.delete()

    serializer = OrderSerializer(order)

    return Response(serializer.data, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders(request):

    orders = Order.objects.filter(user=request.user).order_by("-created_at")

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_single_order(request, pk):

    order = get_object_or_404(Order, id=pk, user=request.user)

    serializer = OrderSerializer(order)

    return Response(serializer.data)


client = razorpay.Client(
    auth=(config("RAZORPAY_KEY_ID"), config("RAZORPAY_KEY_SECRET"))
)

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_payment(request):

    amount = request.data.get("amount")

    if not amount:
        return Response({"error": "Invalid amount"}, status=400)

    amount = int(float(amount)) * 100

    payment = client.order.create(
        {"amount": amount, "currency": "INR", "payment_capture": 1}
    )

    return Response(payment)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def cancel_order(request, pk):
    try:
        order = Order.objects.get(id=pk, user=request.user)

        if order.status in ["SHIPPED", "DELIVERED"]:
            return Response({"error": "Order cannot be cancelled"}, status=400)

        order.status = "CANCELLED"
        order.save()

        return Response({"message": "Order cancelled successfully"})

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
