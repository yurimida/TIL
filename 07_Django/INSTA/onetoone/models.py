from django.db import models

# Create your models here.


class User(models.Model):
    email = models.CharField(max_length=100, default='',unique=True)
    password = models.CharField(max_length=50, default='')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING) # on_delete= models.DO_NOTHING 지울때 아무것도 하지않겠다.
    last_name = models.CharField(max_length=50,default='')
    first_name = models.CharField(max_length=50, default='')