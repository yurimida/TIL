from rest_framework import status
from rest_framework.decorators import api_view
from api.models import Rating,update_movie_view_count,update_movie_rating,create_rating,update_movie_auth, Movie
from api.serializers import RatingSerializer
from rest_framework.response import Response
import time


@api_view(['GET', 'POST', 'DELETE'])
def ratings(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id', None)
        ratings = Rating.objects.all()
        if user_id:
            print(user_id)
            ratings = ratings.filter(user_id=user_id)
        serializer = RatingSerializer(ratings, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        ratings = request.data.get('ratings', None)
        print(ratings)

        for rating in ratings:

            user_id = rating.get('user_id', None)
            movie_id = rating.get('movie_id')
            rating_value = rating.get('rating_value', None)
            rating_id = rating.get('rating_id', None)
            timestamp = rating.get('timestamp', None)
            update = rating.get('update', None)
            ratingupdate = rating.get('ratingupdate', None)
            # 영화 평균평점, total 평점 수 올리기
            if update:
                movie = Movie.objects.get(id=movie_id)
                print(movie)
                totalview = movie.total_rate + 1
                avg = round((movie.average_rating * movie.total_rate + rating_value) / totalview, 3)
                print(movie.id)
                print('원래 평점:',movie.average_rating, movie.total_rate)
                print('바뀐 평점: ', avg, totalview)
                update_movie_rating(movie_id=movie.id, total_rate=totalview, average_rating=avg)
            if ratingupdate:
                rating = Rating.objects.get(id=rating_id)
                origin_rating = rating.rating
                movie = rating.movie
                avg = round((movie.average_rating * movie.total_rate - origin_rating + rating_value) / movie.total_rate, 3)
                print('원래 평점:', movie.average_rating, movie.total_rate)
                print('바뀐 평점: ', avg, movie.total_rate)
                update_movie_rating(movie_id=movie.id, total_rate=movie.total_rate, average_rating=avg)
                rating.rating = rating_value
                rating.timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(int(timestamp)))
                print(rating.timestamp)
                rating.save()
            if not ratingupdate:
                update_movie_auth(user_id=user_id, movie_id=movie_id)
                create_rating(user_id=user_id, movie_id=movie_id, rating_value=rating_value, timestamp=timestamp)

        # 여기서 넣자


        return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
def update_rating(request):
    if request.method == 'POST':
        pass
