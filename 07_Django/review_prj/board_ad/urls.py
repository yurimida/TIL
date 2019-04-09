from django.urls import path
from . import views

app_name = 'board_ad'

urlpatterns = [
    # Read
    path('', views.posting_list, name='posting_list'), # Domain/articles
    path('<int:id>/',views.posting_detail, name='posting_detail'), # Domain/articles/1

]