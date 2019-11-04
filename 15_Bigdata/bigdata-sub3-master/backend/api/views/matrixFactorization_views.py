from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Movie,Rating, update_movie_view_count, Summary, Profile, MF
from api.serializers import MFSerializer
import os
import pandas as pd
import numpy as np
import sqlite3
from scipy.sparse.linalg import svds

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@api_view(['GET', 'POST'])
def matrixFactorization(request):
    if request.method == 'GET':
        id = request.GET.get('id', None)
        # print(id)
        cluster = MF.objects.filter(id=id)
        # print(cluster)
        serializer = MFSerializer(cluster, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        user = request.user.id
        params = request.data.get('params', None)
        id = params.get('id', None)
        print(params)
        print('Matrix Factorization 시작')
        print(request)
        con = sqlite3.connect('./db.sqlite3')
        ratings = pd.read_sql_query("SELECT * FROM api_rating", con)
        movies = pd.read_sql_query("SELECT * FROM api_movie", con)
        movies = movies.rename({'id': 'movie_id'}, axis='columns')
        ratings_df = pd.pivot_table(ratings,index='user_id', columns='movie_id', values='rating').fillna(0)
        R = ratings_df.values
        user_ratings_mean = np.mean(R, axis=1)
        R_demeaned = R - user_ratings_mean.reshape(-1, 1)
        U, sigma, Vt = svds(R_demeaned, k=50)
        sigma = np.diag(sigma)
        all_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
        preds_df = pd.DataFrame(all_user_predicted_ratings, columns=ratings_df.columns)
        def recommend_movies(predictions_df, user_id, movies, original_ratings_df, num_recommendations=10):
            user_row_number = user_id - 1
            sorted_user_predictions = predictions_df.iloc[user_row_number].sort_values(ascending=False)
            user_data = original_ratings_df[original_ratings_df.user_id == (user_id)]
            user_full = (user_data.merge(movies, how='left', left_on='movie_id', right_on='movie_id').
                         sort_values(['rating'], ascending=False)
                         )
            recommendations = (movies[~movies['movie_id'].isin(user_full['movie_id'])].
                                   merge(pd.DataFrame(sorted_user_predictions).reset_index(), how='left',
                                         left_on='movie_id',
                                         right_on='movie_id').
                                   rename(columns={user_row_number: 'Predictions'}).
                                   sort_values('Predictions', ascending=False).
                                   iloc[:num_recommendations, :-1]
                                   )
            recommendations = pd.merge(recommendations, sorted_user_predictions, how='left', on='movie_id')
            recommendations = recommendations.rename(columns={user_row_number: 'predict_rating'})
            return recommendations
        predictions = recommend_movies(preds_df, id, movies, ratings, 10)
        recommend_str = ''
        for i in range(10):
            if i != 9:
                recommend_str += str(predictions.movie_id[i]) + '/'
            else:
                recommend_str += str(predictions.movie_id[i])
        if MF.objects.filter(id=id):
            mf = MF.objects.get(id=id)
            mf.mf_movie = recommend_str
            mf.save()
            print('matrix 갱신 완료!')
        else:
            a = MF(id=id, mf_movie=recommend_str)
            a.save()
            print('matrix 생성 완료')
        print(recommend_str)
        return Response(status=status.HTTP_200_OK)
