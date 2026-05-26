from django.shortcuts import render

# Create your views here.


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import Review
from .serializers import ReviewSerializer

from products.models import Product


# GET REVIEWS OF PRODUCT
@api_view(["GET"])
def get_reviews(request, product_id):

    reviews = Review.objects.filter(product_id=product_id).order_by("-created_at")

    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data)


# CREATE REVIEW
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_review(request, product_id):

    try:
        product = Product.objects.get(id=product_id)

    except Product.DoesNotExist:

        return Response({"error": "Product not found"}, status=404)

    review = Review.objects.create(
        product=product,
        user=request.user,
        rating=request.data.get("rating"),
        comment=request.data.get("comment"),
    )

    serializer = ReviewSerializer(review)

    return Response(serializer.data)
