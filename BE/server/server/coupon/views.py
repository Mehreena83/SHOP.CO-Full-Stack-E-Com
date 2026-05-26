from django.shortcuts import render

# Create your views here.


from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Coupon


@api_view(["POST"])
def apply_coupon(request):

    code = request.data.get("code")

    try:

        coupon = Coupon.objects.get(code=code, active=True)

        return Response(
            {"success": True, "discount": coupon.discount, "code": coupon.code}
        )

    except Coupon.DoesNotExist:

        return Response({"success": False, "message": "Invalid Coupon"})
