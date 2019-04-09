from django.urls import path
from . import views

app_name = 'movie'
urlpatterns = [
    path('movies/<int:id>/', views.detail),
    path('movies/', views.list),

]
