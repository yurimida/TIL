from django.urls import path
from . import views


urlpatterns = [
    # crate
    # /articles/new = > html(새로 작성하는화면)
    path('articles/new/', views.article_new),
    # /articles/create => DB new record
    path('articles/create/', views.article_create),
    # read
    # /articles => html (all articles)
    path('articles/',views.article_list),
    # /articles/1 => html (article with id 1)
    path('articles/<int:id>/', views.article_detail),
    # update
    # /articles/1/edit => html (article id = 1 수정하는화면)
    path('articles/<int:id>/edit/',views.article_edit),
    # /articles/1/update => DB update article id = 1for
    path('articles/<int:id>/update/',views.article_update),
    # delete
    # /articles/1/delete => DB delete article id = 1
    path('articles/<int:id>/delete/',views.article_delete),
]