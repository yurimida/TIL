from django.db import models
from accounts.models import User

# Create your models here.

class Wine(models.Model):
    # wine ID 값
    id = models.CharField(max_length=50, primary_key=True, unique=True)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    wine = models.ForeignKey(Wine, on_delete=models.CASCADE)
    comment = models.TextField(max_length=200)
    rating = models.IntegerField(default=0)
    