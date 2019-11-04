from django.urls import path
from .views import views

# jwt
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

app_name = "accounts"

urlpatterns = [
    # jwt
    path("token/create/", obtain_jwt_token),
    path("token/verify/", verify_jwt_token),
    path("token/refresh/", refresh_jwt_token),

    # Authentication API
    path("sign_up/", views.sign_up),
    path("sign_in/", views.sign_in),
    path("sign_out/", views.sign_out),
    path("search_user/<str:username>/", views.search_user),
]