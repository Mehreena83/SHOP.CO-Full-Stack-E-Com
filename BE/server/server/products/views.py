from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.pagination import PageNumberPagination


@api_view(["GET", "POST"])
def get_products(request):

    # GET PRODUCTS
    if request.method == "GET":

        category = request.GET.get("category")
        search = request.GET.get("search")
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        sort = request.GET.get("sort")
        is_new = request.GET.get("is_new")
        color = request.GET.get("color")
        size = request.GET.get("size")
        rating = request.GET.get("rating")

        products = Product.objects.all().order_by("-id")

        # FILTER BY CATEGORY
        if category:
            products = products.filter(category__name__iexact=category)

        # SEARCH PRODUCT
        if search:
            products = products.filter(name__icontains=search)
        # NEW ARRIVALS
        if is_new == "true":
            products = products.filter(is_new=True)

        # FILTER BY COLOR
        if color:
            products = products.filter(colors__icontains=color)

        # FILTER BY MIN PRICE
        if min_price:
            products = products.filter(price__gte=min_price)

        # SORT PRODUCTS
        if sort == "price_low":
            products = products.order_by("price")

        elif sort == "price_high":
            products = products.order_by("-price")

        elif sort == "newest":
            products = products.order_by("-created_at")

        # FILTER BY MAX PRICE
        if max_price:
            products = products.filter(price__lte=max_price)

        if size:
            products = products.filter(sizes__contains=[size])

        if rating:
            products = products.filter(rating__gte=rating)

        paginator = PageNumberPagination()
        paginator.page_size = 6

        result_page = paginator.paginate_queryset(products, request)

        serializer = ProductSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    # CREATE PRODUCT
    elif request.method == "POST":

        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_product(request, slug):

    try:
        product = Product.objects.get(slug=slug)

        serializer = ProductSerializer(product)

        return Response(serializer.data)

    except Product.DoesNotExist:

        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET", "POST"])
def get_categories(request):

    if request.method == "GET":

        categories = Category.objects.all()

        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)

    elif request.method == "POST":

        serializer = CategorySerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_product(request, slug):

    try:
        product = Product.objects.get(slug=slug)

    except Product.DoesNotExist:

        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_product(request, slug):

    try:
        product = Product.objects.get(slug=slug)

        product.delete()

        return Response({"message": "Product deleted"})

    except Product.DoesNotExist:

        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )
