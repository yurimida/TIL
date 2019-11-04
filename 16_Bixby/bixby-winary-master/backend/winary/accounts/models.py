from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

default_last_login = datetime(2019, 10, 24)

# Create your models here.

class User(AbstractUser):
    # name: 유저명
    # password: 비밀번호
    # is_signed: 유저의 현재 상태(로그인 여부)
    # last_login: 유저가 로그인 상태에서 마지막으로 서버에 유효한 요청을 보낸 시점.
    # last_login은 요청 시마다 유저의 로그인 상태를 결정하는 기준이 됨.
    name = models.CharField(max_length=10, blank=True)
    password = models.CharField(max_length=20)
    is_signed = models.BooleanField(default=False)
    last_login = models.DateTimeField(default=default_last_login)