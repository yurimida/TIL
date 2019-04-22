from django.urls import path
from . import views

app_name='posts'

urlpatterns = [
    path('',views.post_list, name='post_list'),
    path('create/', views.create_post, name='create_post'),
    path('<int:post_id>/update/', views.update_post, name='update_post'),
    path('<int:post_id>/comments/create/',views.create_comment, name='create_comment'),
    path('<int:post_id>/like/',views.toggle_like,name='toggle_like'),
    # /insta/tags.hihi => # hihi를 포함한 모든 posts 보기.
    path('tags/<str:tag_name>/',views.tag_posts_list, name='tag_posts_list'),
]