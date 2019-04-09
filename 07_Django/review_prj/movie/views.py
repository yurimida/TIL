from django.shortcuts import render,redirect
from .models import Movie


# Create your views here.

def list(request):
    movies = Movie.objects.all()
    return render(request, 'movie/list.html', {'movies': movies}, )

def detail(request,id):
    movie = Movie.objects.get(id=id)
    return render(request,'movie/detail.html',{'movie':movie},)