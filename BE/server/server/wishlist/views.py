from django.shortcuts import render

# Create your views here.


from rest_framework.decorators import (
    api_view,
    permission_classes,
)

from rest_framework.permissions import (
    IsAuthenticated,
)

from rest_framework.response import Response

from rest_framework import status

from .models import Wishlist
from .serializers import WishlistSerializer


# GET WISHLIST
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_wishlist(request):

    wishlist_items = Wishlist.objects.filter(user=request.user).order_by("-created_at")

    serializer = WishlistSerializer(wishlist_items, many=True)

    return Response(serializer.data)


# ADD TO WISHLIST
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):

    product_id = request.data.get("product_id")

    already_exists = Wishlist.objects.filter(
        user=request.user, product_id=product_id
    ).exists()

    if already_exists:

        return Response(
            {"message": "Already in wishlist"}, status=status.HTTP_400_BAD_REQUEST
        )

    wishlist_item = Wishlist.objects.create(user=request.user, product_id=product_id)

    serializer = WishlistSerializer(wishlist_item)

    return Response(serializer.data)


# REMOVE FROM WISHLIST
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_wishlist(request, pk):

    try:

        wishlist_item = Wishlist.objects.get(id=pk, user=request.user)

        wishlist_item.delete()

        return Response({"message": "Removed successfully"})

    except Wishlist.DoesNotExist:

        return Response(
            {"error": "Wishlist item not found"}, status=status.HTTP_404_NOT_FOUND
        )
