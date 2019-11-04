# python module
import json, datetime
from datetime import datetime as dt

# django
from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Q

# model
from ..models import User




'''
views에서 필요한 methods를 정의한 파일
'''

# TODO: [중요] SHA256 함수를 활용한 유저명, 비밀번호 암호화 

# Time Delta
def time_delta(t1, t2):
    # TODO: 두 시각의 차이를 계산.
    # TODO: 인증 처리에 사용. 30분을 기준으로 Boolean값 반환.
    pass



# Authentication
def is_authenticated(user, time):
    # TODO: last_login 시각과 time의 차이를 비교, 30분 초과 시에는 false, 아니면 true 반환
    # TODO: true 시에는 last_login을 갱신한다.
    # TODO: false인 경우 로그인 요청을 클라이언트로 전송.
    pass



# 유저 중복확인
def search_username(username):
    try:
        user = User.objects.get(username=username)
        return False
    except:
        return True