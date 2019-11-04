from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Movie,Rating, update_movie_view_count, Summary, Profile, Clustering, KNN, create_KNN
from api.serializers import ClusterSerializer
from django.db.models import F, Count, Sum , Avg
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import sqlite3
from scipy import spatial
from sklearn.cluster import KMeans
from sklearn.cluster import AgglomerativeClustering
from sklearn.mixture import GaussianMixture
import operator
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@api_view(['GET', 'POST'])
def bigdata_cluster(request):
    if request.method == 'GET':
        cluster = Clustering.objects.filter(id=1)
        serializer = ClusterSerializer(cluster, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        params = request.data.get('params', None)
        target = params.get('target', None)
        cluster = params.get('cluster', None)
        k = params.get('k', None)

        if target == 'user':
            print('User 클러스터 시작')
            print(target, cluster, k)
            ratings = Rating.objects.annotate(movieId=F('movie_id'),userId=F('user_id')).values('id', 'rating', 'timestamp', 'movieId', 'userId')
            movies = Movie.objects.annotate(
                movieId=F('id'), genre=F('genres')).values('movieId', 'genre')
            ratings = pd.DataFrame.from_records(ratings)
            movies = pd.DataFrame.from_records(movies)
            movies = pd.merge(movies, ratings, how='left', on='movieId')
            movies = movies.drop(['timestamp'], axis=1)
            s1 = movies.genre.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
            s2 = movies.genre.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
            s3 = movies.genre.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
            df1 = pd.concat([s1, s2, s3], axis=1, keys=['genre'])
            new = pd.merge(movies, df1, left_index=True, right_index=True, how='left')
            new = new.drop(['genre_x'], axis=1)
            new.rename({'genre_y': 'genre'}, axis=1, inplace=True)
            NEW = new.groupby(['userId', 'genre']).mean().round(1)
            NEW = NEW.drop(['movieId'], axis=1)
            NEW = NEW.fillna(0)
            p = NEW.pivot_table("rating", index=["userId"], columns=['genre']).fillna(0)
            cosine_rating = cosine_similarity(p)

            if cluster == 'Kmeans':
                kmeans = KMeans(n_clusters=int(k)).fit(cosine_rating)
                test = pd.DataFrame(kmeans.labels_)
                test.rename({0: 'cluster'}, axis=1, inplace=True)
            elif cluster == 'Hierarchical':
                model = AgglomerativeClustering(n_clusters=int(k), affinity='euclidean', linkage='ward')
                model.fit(cosine_rating)
                labels = model.labels_
                test = pd.DataFrame(data=labels, columns=['cluster'])

            for index, data in test.iterrows():
                profile = Profile.objects.filter(id=index)
                profile.update(cluster=data['cluster'])

            print('클러스터 끝')
            updatecluster = Clustering.objects.get(id=1)
            updatecluster.user_label = k
            updatecluster.user_cluster = cluster
            updatecluster.save()
            return Response(status=status.HTTP_200_OK)

        elif target == 'movie':
            print('Movie 클러스터 시작')
            if cluster != 'KNN':
                ratings = Rating.objects.annotate(movieId=F('movie_id'), userId=F('user_id')).values('id', 'rating', 'timestamp', 'movieId', 'userId')
                ratings = pd.DataFrame.from_records(ratings)
                ratings = ratings.fillna(0)
                p = ratings.pivot_table(values='rating', index='movieId', columns='userId', fill_value=0)
                cosine_rating = cosine_similarity(p)

                if cluster == 'Kmeans':
                    kmeans = KMeans(n_clusters=int(k)).fit(cosine_rating)
                    test = pd.DataFrame(kmeans.labels_, p.index)
                    test.rename({0: 'cluster'}, axis=1, inplace=True)

                elif cluster == 'Hierarchical':
                    model = AgglomerativeClustering(n_clusters=int(k), affinity='euclidean', linkage='ward')
                    model.fit(cosine_rating)
                    test = pd.DataFrame(model.labels_, p.index)
                    test = test.fillna(0)
                    test.rename({0: 'cluster'}, axis=1, inplace=True)

                elif cluster == 'EM':
                    gmm = GaussianMixture(n_components=int(k)).fit(cosine_rating)
                    test = pd.DataFrame(gmm.predict(cosine_rating), p.index)
                    test.rename({0: 'cluster'}, axis=1, inplace=True)

                for index, data in test.iterrows():
                    movie = Movie.objects.filter(id=index)
                    movie.update(cluster=data['cluster'])
            elif cluster == 'KNN':
                ratings = Rating.objects.values('movie_id').annotate(size=Count('movie_id'), rating=Avg('rating')).values('movie_id', 'size', 'rating')
                movies = Movie.objects.values('id','title','genres')
                # print(movies)

                print('호명이형돌아와')

                movieProperties = pd.DataFrame.from_records(ratings)

                movies = pd.DataFrame.from_records(movies)

                movieProperties = movieProperties.set_index("movie_id")
                # print(movieProperties)
                movieProperties2  = pd.DataFrame(movieProperties['size'])
                movieNormalizedNumRatings = movieProperties2.apply(lambda x: (x - np.min(x)) / (np.max(x) - np.min(x)))
                movieDict = {}
                genre_uni = []
                movies["genre_list"] = movies.genres.apply(lambda x: x.split("|"))
                for i, r in movies.iterrows():
                    genre_uni += r.genre_list
                genre_uni = list(set(genre_uni))
                # 18
                genre_idx = {}
                for idx in range(len(genre_uni)):
                    genre_idx[genre_uni[idx]] = idx
                for index, row in movies.iterrows():
                    Genres = row.genres
                    genre_list = Genres.split("|")
                    zz = [0 for _ in range(18)]
                    for G in genre_list:
                        zz[genre_idx[G]] = 1
                    try:
                        movieDict[row.id] = (
                        row.title, genre_list, zz, movieNormalizedNumRatings.loc[row.id + 1].get('size'),
                        movieProperties.loc[row.id + 1].rating)
                    except KeyError:
                        continue

                def ComputeDistance(a, b):
                    genresA = a[2]
                    genresB = b[2]
                    genreDistance = spatial.distance.cosine(genresA, genresB)
                    popularityA = a[3]
                    popularityB = b[3]
                    popularityDistance = abs(popularityA - popularityB)
                    return genreDistance + popularityDistance

                def getNeighbors(movieID, K):
                    distances = []
                    for movie in movieDict:
                        if (movie != movieID):
                            dist = ComputeDistance(movieDict[movieID], movieDict[movie])
                            distances.append((movie, dist))
                    distances.sort(key=operator.itemgetter(1))
                    neighbors = []
                    for x in range(K):
                        neighbors.append(distances[x][0])
                    return neighbors

                print('가즈아')
                for id in range(1, 3953):
                    try:
                        knn_movie = getNeighbors(id, 12)

                        # print(id, knn_movie)
                        # print(type(id), type(knn_movie))
                        KNN.objects.create(
                            id=id,
                            knn_movie=knn_movie
                        )
                    except Exception as ex:
                        print(ex, "ㄱ ㅏ없어요 ㅠㅠ")
                        continue

            print('클러스터 끝')
            updatecluster = Clustering.objects.get(id=1)
            if k:
                updatecluster.movie_label = k
            updatecluster.movie_cluster = cluster
            updatecluster.save()
            return Response(status=status.HTTP_200_OK)
