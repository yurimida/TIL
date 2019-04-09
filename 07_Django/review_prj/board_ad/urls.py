from django.urls import path
from . import views

app_name = 'board_ad'

urlpatterns = [
    # Read
    path('', views.posting_list, name='posting_list'), # Domain/articles
    path('<int:posting_id>/',views.posting_detail, name='posting_detail'), # Domain/articles/1

    # Create
    path('new/', views.posting_create, name='posting_create'),

    # Update
    path('update/<int:posting_id>/', views.posting_update, name='posting_update'),

    path('delete/<int:posting_id>/', views.posting_delete, name='posting_delete'),

    path('<int:posting_id>/comments/create/', views.create_comment, name='create_comment'), #domain/posting/1/comments/create
    path('<int:posting_id>/comments/<int:comment_id>/delete/',views.delete_comment, name='delete_comment'),

    ]