from django.contrib import admin
from .models import Movie, Rating, Profile


class MovieModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'genres', 'average_rating', 'total_rate', 'view_cnt', 'poster_url' )
    list_display_links = ('id', 'title')


class ProfileModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'age', 'occupation', 'gender')
    list_display_links = ('id', 'occupation')


class RatingModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'rating', 'movie', 'user')
    list_display_links = ('id', 'rating')


admin.site.register(Movie, MovieModelAdmin)
admin.site.register(Rating, RatingModelAdmin)
admin.site.register(Profile, ProfileModelAdmin)
