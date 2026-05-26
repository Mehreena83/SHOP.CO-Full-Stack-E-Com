from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password


@api_view(["POST"])
def register_user(request):

    data = request.data

    try:

        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
        )

        return Response(
            {"message": "User registered successfully"}, status=status.HTTP_201_CREATED
        )

    except:

        return Response(
            {"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST
        )


# from django.contrib.auth.models import User
# from django.core.mail import send_mail

# from rest_framework.decorators import api_view
# from rest_framework.response import Response


# @api_view(['POST'])
# def forgot_password(request):

#     email = request.data.get("email")

#     try:

#         user = User.objects.get(email=email)

#         send_mail(
#             "Reset Password",
#             "This is your password reset email.",
#             "yourgmail@gmail.com",
#             [email],
#             fail_silently=False,
#         )

#         return Response({
#             "message": "Email sent successfully"
#         })

#     except User.DoesNotExist:

#         return Response({
#             "error": "User not found"
#         }, status=404)


from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from django.core.mail import send_mail

from rest_framework.views import APIView
from rest_framework.response import Response


class ForgotPasswordView(APIView):

    def post(self, request):

        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        uid = urlsafe_base64_encode(force_bytes(user.pk))

        token = default_token_generator.make_token(user)

        reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"

        send_mail(
            "Reset Your Password",
            f"Click here to reset password:\n{reset_link}",
            "mehreenamehri83@gmail.com",
            [email],
            fail_silently=False,
        )

        return Response({"message": "Reset link sent"})


from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator


class ResetPasswordView(APIView):

    def post(self, request, uidb64, token):

        password = request.data.get("password")

        try:
            uid = urlsafe_base64_decode(uidb64).decode()

            user = User.objects.get(pk=uid)

        except:
            return Response({"error": "Invalid link"}, status=400)

        if not default_token_generator.check_token(user, token):

            return Response({"error": "Invalid token"}, status=400)

        user.set_password(password)

        user.save()

        return Response({"message": "Password reset successful"})
