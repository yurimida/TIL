from .models import Profile, Movie, Rating, Summary, Clustering, MF
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    username = serializers.SerializerMethodField('get_profile_username')
    is_staff = serializers.SerializerMethodField('get_profile_is_staff')

    class Meta:
        model = Profile
        fields = ('id', 'username', 'is_staff', 'gender', 'age', 'occupation')

    def get_profile_username(self, obj):
        return obj.user.username

    def get_profile_is_staff(self, obj):
        return obj.user.is_staff


class ProfileDetailSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    username = serializers.SerializerMethodField('get_profile_username')
    is_staff = serializers.SerializerMethodField('get_profile_is_staff')
    movies = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = ('id', 'username', 'is_staff', 'gender', 'age', 'occupation', 'movies', 'image', 'subscribe')

    def get_profile_username(self, obj):
        return obj.user.username

    def get_profile_is_staff(self, obj):
        return obj.user.is_staff


class MovieSerializer(serializers.ModelSerializer):
    genres_array = serializers.ReadOnlyField()

    class Meta:
        model = Movie
        fields = ('id', 'title', 'genres_array', 'average_rating', 'total_rate', 'view_cnt', 'poster_url', 'trailer')


class MovieDetailSerializer(serializers.ModelSerializer):
    genres_array = serializers.ReadOnlyField()

    class Meta:
        model = Movie
        fields = ('id', 'title', 'genres_array', 'average_rating', 'total_rate', 'view_cnt', 'user_username', 'movie_summary', 'poster_url', 'trailer')


class RatingSerializer(serializers.ModelSerializer):
    rating = serializers.ReadOnlyField()

    class Meta:
        model = Rating
        fields = ('id', 'user', 'movie', 'movie_title', 'movie_poster', 'rating', 'timestamp')


class SummarySerializer(serializers.ModelSerializer):
    body = serializers.ReadOnlyField()

    class Meta:
        model = Summary
        fields = ('id', 'movie', 'body')


class ClusterSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Clustering
        fields = ('id', 'movie_label', 'movie_cluster', 'user_label', 'user_cluster')


class MFSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = MF
        fields = ('id',"mf_movie_object")
