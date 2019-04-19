from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.conf import settings


'''
장고 프로젝트를 시작할때 제일 처음해야할일

0. User 모델의 확장 가능성을 염두해라.
1. $ django-admin startproject MY_PROJECT
2. $ django-admin startapp accounts
3. accounts/models.py => 아래 코드 작성
4. settings.py => INSTALEED APPS += 'accounts'
5. settings.py => AUTH_USERMODEL = 'accounts.User'

'''
class User(AbstractUser):
    followings = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
    related_name= 'followers',
    blank=True,
    )

    def __str__(self):
        return self.username


