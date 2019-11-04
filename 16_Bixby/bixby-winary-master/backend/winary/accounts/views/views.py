# python module
import json, datetime
from datetime import datetime as dt

# django
from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Q

# rest framework
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# model
from ..models import User

# methods.py
from .methods import *




# 유저 중복확인 (from Web)
@api_view(['GET'])
def search_user(request, username):
    response = search_username(username)
    return Response(data={'response': response}, status=status.HTTP_200_OK)
    


# 회원가입
@api_view(['POST'])
def sign_up(request):
    # Data 
    data = request.data
    username = data['username']
    password1 = data['password1']
    password2 = data['password2']
    name = data['name']

    # Validation
    # TODO : 정규 표현식을 활용하여 상세화된 포맷 유효성 검증 로직 작성. (format validation)
    # 유저가 중복되는지 확인하기. (search_username)
    if search_username(username) and len(username) >= 6 and len(password1) >= 6 and password1 == password2:
        pass
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Create User
    user = User.objects.create()
    user.username = username
    user.password = password2
    user.name = name
    user.save()
    return Response(status=status.HTTP_201_CREATED)
    


# 로그인
@api_view(['POST'])
def sign_in(request):
    # Data 
    data = request.data
    username = data['username']
    password = data['password']

    # Authentication
    # 성공 시에는 로그인처리, last_login을 현재시점으로 갱신
    # 유저가 없으면 404, 찾지못함
    # 인증 실패 시에는 401, 권한없음
    user = get_object_or_404(User, username=username)
    if user.password == password:
        user.is_signed = True
        user.last_login = dt.now()
        user.save()
        return Response(data={'username': user.username}, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)



# 로그아웃
@api_view(['POST'])
def sign_out(request):
    # Data 
    data = request.data
    username = data['username']

    # Authentication
    # 유저가 없으면 404, 찾지못함
    # 요청을 보낸 사람이 로그인 상태가 유효한지 확인. 
    # 유효하면 로그아웃처리. 
    # 유효하지 않다면 403, 권한없음
    user = get_object_or_404(User, username=username)
    if user.is_signed == True:
        user.is_signed = False
        user.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=HTTP_403_FORBIDDEN)



# TODO: 회원탈퇴