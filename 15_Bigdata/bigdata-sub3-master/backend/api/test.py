from .models import Profile, Movie, Rating, Summary, update_movie_view_count,update_movie_rating, update_movie_auth, Clustering, MF
# from .models import ClusteringMovie,ClusteringUser
from django.contrib.auth.models import User
import math
# import pandas as pd

def initialize_rating():
    for movie_id in range(1, 3953):
        ratings = Rating.objects.filter(movie_id=movie_id)
        totalview = len(ratings)
        totalrating = sum(i.rating for i in ratings)
        avg = 0
        if totalview != 0:
            avg = round(totalrating/totalview, 3)
            # print(avg)
        update_movie_rating(movie_id=movie_id, total_rate=totalview, average_rating=avg)


# 조회수
def initialize_movie_views():
    pass


# def initialize_auth_movie():
#     for id in range(1, len(User.objects.all())+1):
#         ratings = Rating.objects.filter(user_id=id)
#         for j in ratings:
#             update_movie_auth(user_id=id, movie_id=j.movie_id)


# def update_auth_movie(id):
#     ratings = Rating.objects.filter(user_id=id)
#     for i in ratings:
#         update_movie_auth(user_id=id, movie_id=i.movie_id)


def create_cluster():
    Clustering.objects.create(
        movie_label='5',
        movie_cluster='Kmeans',
        user_label='5',
        user_cluster='Kmeans'
    )


initialize_rating()
# initialize_auth_movie()
create_cluster()
