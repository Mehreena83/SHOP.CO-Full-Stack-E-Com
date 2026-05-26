from django.shortcuts import render

# Create your views here.


from rest_framework.decorators import api_view

from rest_framework.response import Response

from django.core.mail import send_mail

from .models import NewsletterSubscriber

from .serializers import NewsletterSerializer


@api_view(["POST"])
def newsletter_subscribe(request):

    serializer = NewsletterSerializer(data=request.data)

    if serializer.is_valid():

        subscriber = serializer.save()

        # SEND EMAIL
        send_mail(
            subject="Welcome to SHOP.CO 🎉",
            message="""
Thank you for subscribing to SHOP.CO Newsletter ❤️

You will now receive:

- Latest Offers
- New Arrivals
- Exclusive Discounts
- Fashion Updates

Stay Tuned 🔥
            """,
            from_email="yourgmail@gmail.com",
            recipient_list=[subscriber.email],
            fail_silently=False,
        )

        return Response({"success": True, "message": "Subscribed Successfully"})

    return Response(serializer.errors)
