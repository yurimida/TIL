from rest_framework import status
from rest_framework.decorators import api_view
from api.models import Movie,Rating, update_movie_view_count, Summary, User
from api.serializers import MovieSerializer, MovieDetailSerializer
from rest_framework.response import Response
from django.db.models import F, Count, Q,Value, CharField
from django.db.models.functions import Concat
import random

@api_view(['GET', 'POST', 'DELETE'])
def movies(request):

    if request.method == 'DELETE':
        id = request.GET.get('0',None)
        id2 = request.GET.get('params',None)
        movie = Movie.objects.filter(pk=id)
        print(movie)
        movie.delete()
        return Response(status=status.HTTP_200_OK)


    if request.method == 'GET':
        id = request.GET.get('id', request.GET.get('movie_id', None))
        title = request.GET.get('title', None)
        genre = request.GET.get('genre', None)
        age = request.GET.get('age', None)
        occupation = request.GET.get('occupation', None)
        gender = request.GET.get('gender', None)
        isAdminPage = request.GET.get('isAdminPage', None)
        isRatingPage = request.GET.get('isRatingPage', None)
        isRatingUpdatePage = request.GET.get('isRatingUpdatePage', None)
        user_id = request.GET.get('user_id', None)
        # 상세보기때
        # print('1',id, '2',title,'3', genre,'4', age, '5',occupation,'6', gender,'7', isAdminPage)
        if id:
            # update_movie_view_count(movie_id=id)
            movie = Movie.objects.filter(pk=id)
            cluster_label = movie[0].cluster
            movies = list(Movie.objects.filter(cluster=cluster_label))
            # print(list(movie))
            # print(movies)
            movies.remove(movie[0])
            # print(movies)
            if len(movies) >= 12:
                movies = random.sample(movies, 12)
            movies.insert(0, movie[0])
            serializer = MovieDetailSerializer(movies, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        # 검색때
        if genre == 'All':
            genre = ''
        if age == 'All':
            age = ''
        if occupation == 'All':
            occupation = ''
        if gender == 'All':
            gender = ''
        sortBy = request.GET.get('sortBy', None)
        movies = Rating.objects.select_related()

        if title:
            movies = movies.filter(movie__title__icontains=title)
        if genre:
            movies = movies.filter(movie__genres__icontains=genre)
        if age:
            movies = movies.filter(user__profile__age=age)
        if occupation:
            movies = movies.filter(user__profile__occupation=occupation)
        if gender:
            movies = movies.filter(user__profile__gender=gender)

        movies = movies.values('movie__id').annotate(id=F('movie__id'),title=F('movie__title'),genres_array=F('movie__genres'),average_rating=F('movie__average_rating'),total_rate=F('movie__total_rate'),poster_url=F('movie__poster_url'),summary_id=F('movie__summary_id'),view_cnt=F('movie__view_cnt'),trailer=F('movie__trailer'), watch_cnt=Count('movie__id'))

        if sortBy:
            movies = movies.order_by('-'+sortBy)
            # print(movies)
        if isAdminPage:
            movies = Movie.objects.all()
            # movies = movies.values('id').annotate(title=F('title'),genres_array=F('genres'),average_rating=F('average_rating'),total_rate=F('total_rate'),poster_url=F('poster_url'),summary_id=F('summary_id'),view_cnt=F('view_cnt'),watch_cnt=Count('id'))
            # print(movies)
        if isRatingPage:
            user = User.objects.get(id=user_id)
            print(user)
            print('전체',len(Movie.objects.all()))
            print('평점남긴거',len(user.movie.all()))
            movies = Movie.objects.filter(Q() & ~Q(user__id=user_id))
            # movies = movies.values('id').annotate(title=F('title'), genres_array=F('genres'),
            #                                       average_rating=F('average_rating'), total_rate=F('total_rate'),
            #                                       poster_url=F('poster_url'), summary_id=F('summary_id'),
            #                                       view_cnt=F('view_cnt'), watch_cnt=Count('id'))
            print('평점안남긴거',len(movies))
        if isRatingUpdatePage:
            user = User.objects.get(id=user_id)
            print(user)
            print('전체', len(Movie.objects.all()))
            print('평점남긴거', len(user.movie.all()))
            movies = Movie.objects.filter(Q() & Q(user__id=user_id))

        serializer = MovieSerializer(movies, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        movies = request.data.get('movies', None)
        for movie in movies:
            id = movie.get('id', None)
            title = movie.get('title', None)
            genres = movie.get('genres', None)
            summary = Summary.objects.filter(id=id)
            poster_url = movie.get('poster_url', None)
            trailer = movie.get('trailer', None)

            if not (id and title and genres):
                continue
            if Movie.objects.filter(id=id).count() > 0 or Movie.objects.filter(title=title).count() > 0:
                continue
            if len(summary):
                # print(summary, id)
                Movie(id=id, title=title, genres='|'.join(genres), poster_url=poster_url, trailer=trailer, summary=summary[0]).save()
            else:
                Movie(id=id, title=title, genres='|'.join(genres), poster_url=poster_url, trailer=trailer).save()

        return Response(status=status.HTTP_200_OK)



@api_view(['POST'])
def modify(request):
    if request.method == 'POST':
        find = request.data.get('params', None)
        id = find.get('id',None)
        movie = Movie.objects.get(pk=id)

        summary = Summary.objects.get(pk=id)
        # movie.id =
        movie.title = find.get('title',None)
        movie.genres = '|'.join(find.get('genres',None))
        # movie.average_rating = find.get('average_rating',None)
        # movie.total_rate = find.get('total_rate',None)
        # movie.view_cnt = find.get('view_cnt',None)

        summary.body = find.get('summary',None)
        # movie.user = find.get('user',None)
        # movie.poster_url = find.get('poster_url',None)
        # movie.cluster = find.get('cluster',None)
        summary.save()
        movie.save()
        return Response(status=status.HTTP_201_CREATED)
