from django.db import models
from django.contrib.auth.models import User
import time
from django.utils.timezone import datetime
from datetime import timedelta


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10, default='M')
    age = models.IntegerField(default=25)
    occupation = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    cluster = models.IntegerField(default=0)
    subscribe = models.DateTimeField(auto_now_add=True)


    @property
    def movies(self):
        return list(map(lambda x: [x.id, x.title], self.user.movie.all()))

    def __str__(self):
        return str(self.id)

#  wrapper for create user Profile
def create_profile(**kwargs):

    user = User.objects.create_user(
        username=kwargs['username'],
        password=kwargs['password'],
        is_active=True,
    )

    profile = Profile.objects.create(
        user=user,
        gender=kwargs['gender'],
        age=kwargs['age'],
        occupation=kwargs['occupation'],
        image=kwargs['image'],
    )
    update_subscribe(id=profile.id, days=31)

    return profile


def update_subscribe(**kwargs):
    profile = Profile.objects.get(id=kwargs['id'])
    profile.subscribe = datetime.now()
    profile.subscribe += timedelta(days=kwargs['days'])
    profile.save()


class Summary(models.Model):
    id = models.IntegerField(primary_key=True)
    body = models.CharField(max_length=3000)


class KNN(models.Model):
    id = models.IntegerField(primary_key=True)
    knn_movie = models.CharField(max_length=1000)


def create_KNN(id, knn_movie):
    knn = KNN.objects.create(
        id=id,
        knn_movie=knn_movie
    )
    return knn


class MF(models.Model):
    id = models.IntegerField(primary_key=True)
    mf_movie = models.CharField(max_length=1000)

    @property
    def mf_movie_object(self):
        movie_id_list = self.mf_movie.split("/")
        movie_response = []
        for mid in movie_id_list:
            movie_ = Movie.objects.get(id=mid)
            one_movie = {}
            one_movie["id"] = movie_.id
            one_movie["title"] = movie_.title
            one_movie["genres"] = movie_.genres
            one_movie["poster_url"] = movie_.poster_url
            one_movie["trailer"] = movie_.trailer
            one_movie["movie_summary"] = movie_.movie_summary
            # print(one_movie)
            movie_response.append(one_movie)
            # print(movie_response)
        return movie_response
        # return self.genres.strip().split('|')


class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    genres = models.CharField(max_length=500)
    average_rating = models.FloatField(default=0)
    total_rate = models.IntegerField(default=1)
    view_cnt = models.IntegerField(default=0)
    user = models.ManyToManyField(User, related_name='movie')
    summary = models.OneToOneField(Summary, on_delete=models.CASCADE, blank=True, null=True)
    poster_url = models.CharField(max_length=500)
    trailer = models.CharField(max_length=1000)
    cluster = models.IntegerField(default=0)

    @property
    def genres_array(self):
        return self.genres.strip().split('|')

    @property
    def user_username(self):
        return list(map(lambda x: [x.id, x.username], self.user.all()))

    @property
    def movie_summary(self):
        return self.summary.body

    def __str__(self):
        return str({self.id: self.title})


def update_movie_view_count(**kwargs):
    movie = Movie.objects.get(id=kwargs['movie_id'])
    movie.view_cnt += 1
    movie.save()


def update_movie_rating(**kwargs):
    movie = Movie.objects.filter(id=kwargs['movie_id'])
    if len(movie) == 1:
        movie = movie[0]
        movie.total_rate = kwargs['total_rate']
        movie.average_rating = kwargs['average_rating']
        movie.save()
    else:
        # print(kwargs['movie_id'])
        pass


def update_movie_auth(**kwargs):
    user = User.objects.get(id=kwargs['user_id'])
    movie = Movie.objects.get(id=kwargs['movie_id'])
    movie.user.add(user)
    # print(user)
    # print(movie)


def update_movie_summary(**kwargs):
    summary = Summary.objects.get(id=kwargs['summary_id'])
    movie = Movie.objects.get(id=kwargs['movie_id'])
    movie.summary.add(summary)


class Rating(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, default=1)
    rating = models.FloatField(default=0.0)
    timestamp = models.DateTimeField()

    @property
    def movie_title(self):
        return self.movie.title

    @property
    def movie_poster(self):
        return self.movie.poster_url

    def __str__(self):
        return str({self.movie.title: self.rating})


def create_rating(**kwargs):
    user = User.objects.get(id=kwargs['user_id'])
    movie = Movie.objects.get(id=kwargs['movie_id'])

    rating = Rating.objects.create(
        user=user,
        movie=movie,
        rating=kwargs['rating_value'],
        timestamp=time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(int(kwargs['timestamp']))),
    )
    return rating


class Clustering(models.Model):
    id = models.IntegerField(primary_key=True)
    movie_label = models.IntegerField(default=0)
    movie_cluster = models.CharField(max_length=100)
    user_label = models.IntegerField(default=0)
    user_cluster = models.CharField(max_length=100)
