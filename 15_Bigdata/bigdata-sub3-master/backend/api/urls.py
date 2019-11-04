from django.conf.urls import url
from api.views import movie_views
from api.views import auth_views
from api.views import rating_views
from api.views import summary_views
from api.views import clustering_views
from api.views import matrixFactorization_views

urlpatterns = [

    url('auth/signup-many/$', auth_views.signup_many, name='sign_up_many'),
    url('auth/login/$', auth_views.login, name='login'),
    url('auth/update-subscribe/$', auth_views.update_user_subscribe, name='update_user_subscribe'),
    url('auth/modify/$',auth_views.modify, name='modify'),
    url('auth/delete-user/$', auth_views.delete_user, name='user_delete'),
    url('auth/setUserGrade/$', auth_views.setUserGrade, name='update_user_grade'),
    
    url('movies/$', movie_views.movies, name='movie_list'),
    url('modifyMovie/$', movie_views.modify, name='modify_Movie'),

    url('ratings/$', rating_views.ratings, name='rating_list'),
    url('setRatings/$', rating_views.ratings, name='set_ratings'),

    url('summaries/$', summary_views.summaries, name='summary_list'),

    url('clustering/$', clustering_views.bigdata_cluster, name='clustering'),
    url('matrix/$', matrixFactorization_views.matrixFactorization, name='matrixFatorization'),
    url('getMatrix/$', matrixFactorization_views.matrixFactorization, name='getMatrixFatorization'),

]
