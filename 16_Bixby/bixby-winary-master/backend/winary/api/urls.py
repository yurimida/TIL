from django.urls import path
from . import views

# jwt
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

app_name = "winary"

urlpatterns = [
    # jwt
    path("token/create/", obtain_jwt_token),
    path("token/verify/", verify_jwt_token),
    path("token/refresh/", refresh_jwt_token),

    # wine api
    path("wines/", views.wines, name="winary_wines"),
    path("", views.redirect_winary, name="redirect_winary"),
    path("wine_detail_info/<str:wine_id>/", views.wine_detail_info, name="wine_detail_info"),

    # user api
    path("users/", views.users, name="winary_users"),

    # api for web (wine, comment)
    path("web/wines/", views.create_wine_data),
    path("wine_list/", views.wine_list),
    path("comments/<str:wine_id>", views.comments),
    path("comment/", views.comment),

    # privacy policy
    path("privacy_policy/", views.privacy_policy, name="privacy_policy")
]
