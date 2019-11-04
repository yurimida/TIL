from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Q
import json, datetime

# rest framework
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# mongodb
from mongodb import find_query, find_user, insert_user, delete_user, find_user_wine
from mongodb_web import find as find_query_from_web
from bson.objectid import ObjectId

# model
from accounts.models import User
from .models import Wine, Comment

# serializers
from .serializers import CommentSerializer


# Create your views here.
def redirect_winary(request):
    return redirect("winary:winary_wines")


@api_view(["GET", "POST"])
def wines(request):
    if request.method == "GET":
        queries = dict(request.GET)
        # query를 GET 요청으로 보낼 경우 request.GET을 dict로 변환
        # request.GET의 value 값이 list형식으로 들어와서 list에서 빼주는 for문
        # ex) {'tasting_sweetness': ['{"$gt":2}'], "CATEGORIES": "화이트와인"}
        for key, val in queries.items():
            try:
                # json.loads()를 통해 dict형식의 문자열을 dict로 변환 ex) '{"$gt":2}'
                queries[key] = json.loads(val[0])
            except ValueError:
                # "화이트와인"은 dict로 바꿀 수 없어서 list에서만 빼줌
                queries[key] = val[0]

        wine = find_query(queries)

        return Response(data={"count": len(wine), "wine": wine}, status=status.HTTP_202_ACCEPTED)

    if request.method == "POST":
        queries = dict(request.data)
        for key, val in queries.items():
            if type(val) == list:
                queries[key] = val[0]

        queries["query"] = json.loads(queries["query"])

        wine = find_query(queries)

        return Response(data={"count": len(wine), "wine": wine}, status=status.HTTP_202_ACCEPTED)


def privacy_policy(request):
    return render(request, "api/privacy-policy.html")



@api_view(['GET'])
def wine_detail_info(request, wine_id):
    print(wine_id)
    query = { '_id': ObjectId(wine_id) }
    wine_data = find_query_from_web(query)

    return Response(data={"wine": wine_data}, status=status.HTTP_202_ACCEPTED)


# user
@api_view(["GET", "POST", "DELETE"])
def users(request):
    user = {"error": 401}
    st = status.HTTP_401_UNAUTHORIZED

    if request.method == "GET":
        query = dict(request.GET)

        for key, val in query.items():
            query[key] = val[0]

        user = find_user(query)
        st = status.HTTP_202_ACCEPTED

    if request.method == "POST":
        query = dict(request.data)
        for key, val in query.items():
            if type(val) == list:
                query[key] = val[0]

        bixby = query.get("bixby", None)

        if bixby == "true":
            user_id = query.get("userId", None)
            wine = query.get("wine", None)

            if user_id and wine:
                insert_user(query)
            user = find_user_wine({"userId": query["userId"]})
            st = status.HTTP_202_ACCEPTED

    if request.method == "DELETE":
        query = dict(request.data)
        for key, val in query.items():
            if type(val) == list:
                query[key] = val[0]

        bixby = query.get("bixby", None)

        if bixby == "true":
            user_id = query.get("userId", None)
            wine = query.get("wine", None)

            if user_id and wine:
                delete_user(query)
            user = find_user_wine({"userId": query["userId"]})
            st = status.HTTP_202_ACCEPTED

    return Response(data={"count": len(user), "user": user}, status=st)



# 와인 데이터 생성 (in Sqlite3 of Django)
# backend > winery > mongodb_web.py를 실행시켜 와인데이터를 초기화합니다.
@api_view(["POST"])
def create_wine_data(request):
    wine_list = dict(request.data)['wine_list']
    
    for wine in wine_list:
        wine_data, created = Wine.objects.get_or_create(id=wine)
        # print(wine_data)
        # print(wine_data.id, created)

    return Response(status=status.HTTP_201_CREATED)



# 조건에 맞는 와인 탐색 (웹 사이트 와인 리스트 페이지)
# 요청을 받은 후, 쿼리를 구성하여 mongodb_web.py의 쿼리용 메소드에 넘겨준다.
# $or(or_query) : 와인명이 영문, 국문 중 하나만 일치하여도 결과로 추출되기 위함.
@api_view(['GET'])
def wine_list(request):

    # 쿼리 생성에 필요한 변수 정의
    # region : 원산지 처리를 위함.
    # varietal, varietal_others, nor_query : 기타 품종을 위한 $nor 연산 처리에 사용.
    # keyword_field, or_query : 검색 키워드 $or 연산 처리에 사용.
    region = ''
    varietals = ['까베르네 소비뇽', '메를로', '까르미네르', '시라', '피노 누아', '말벡', '산지오베제', '샤르도네', '소비뇽 블랑', '리슬링', '모스까또']
    varietal_others = False
    keyword_field = ['wine_en_name', 'wine_ko_name', 'BRAND']
    or_query = []
    

    # Request 데이터 추출
    data = dict(request.GET)
    
    # 쿼리 생성 (1)
    for key in data:
        if key == 'KEYWORD':
            value = data[key][0]
            print(value)
        else:
            value = data[key][0]

        # 와인 종류
        if key == 'CATEGORIES':
            data[key] = {'$regex': '^{}'.format(value)}

        # 포도 품종
        # 기타 품종은 $nor 연산활용
        elif key == 'VARIETAL':
            if value != '기타 품종':
                data[key] = {'$regex': '^{}'.format(value)}
            else:
                varietal_others = True
        
        # 원산지
        elif key == 'REGION':
            region = value

        # 검색 키워드 (와인명(kr/en), 브랜드명, 음식명))
        elif key == 'KEYWORD':      
            # FOOD Keyword 처리.
            if '|' in value:
                food_categories = list(map(str, value.split('|')))
                for category in food_categories:
                    or_query.append({'FOOD': {'$regex': category}})
            else:
                for field in keyword_field:
                    or_query.append({field: {'$regex': value, '$options': 'i'}})

                or_query.append({'FOOD': {'$regex': value}})
        else:
            pass
    

    # 쿼리 생성 (2) : $or, $nor 등의 쿼리 생성 및 불필요한 필드 제거
    if len(or_query):
        data.update({'$or': or_query})

    if region:
        data.update({'REGION': region})

    # 포도 기타 품종 처리.
    if varietal_others:
        nor_query = []
        for varietal in varietals:
            nor_query.append({'VARIETAL': {'$regex': '^{}'.format(varietal)}})
        data.update({'$nor': nor_query})
        data.pop('VARIETAL', None)

    data.pop('KEYWORD', None)


    # find query 호출 및 결과 반환.
    wine_data = find_query_from_web(data)
    return Response(data={"count": len(wine_data), "wine": wine_data}, status=status.HTTP_200_OK)



# 와인의 댓글 받아오기
@api_view(['GET'])
def comments(request, wine_id):
    # 와인이 DB에 없을 경우 404 반환
    wine = get_object_or_404(Wine, id=wine_id)

    # 댓글 정보 반환
    comments = Comment.objects.filter(wine=wine)
    serializer = CommentSerializer(comments, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)



# 댓글 생성, 삭제
@api_view(['POST', 'DELETE'])
def comment(request):
    data = request.data

    # 1. 유저 인증 상태 검증
    # TODO: username을 확인하여 해당 유저의 인증상태가 유효한지 확인 (is_authenticated)
    # TODO: 인증이 유효하지 않은 경우 401 반환
    # 유저가 없는 경우에는 404 반환
    # 인증이 유효한 경우 와인 유효성 검증 단계로 넘어간다.
    username = data['username']
    user = get_object_or_404(User, username=username)

    # 2. 와인 유효성 검증 와인이 DB에 없을 경우 404 반환
    # 유효한 경우 method별로 분기처리.
    wine_id = data['wineId']
    wine = get_object_or_404(Wine, id=wine_id)


    # 생성하는 경우 (POST)
    if request.method == 'POST':
        # 3. 댓글, 평점 데이터의 형식 유효성 검증
        # 3-1. 댓글, 평점 정보의 형식이 유효하지 않을 경우 400 반환
        try:
            comment = data['comment']
            rating = int(data['rating'])
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 3-2. 댓글, 평점 정보의 유효성 추가 검증. 유효하지 않을경우 400 반환
        if (len(comment) == 0 or len(comment) > 200) or (rating < 0 or rating > 5):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # 3-3. 모두 유효한 경우 댓글을 작성, 201 반환
        # 단, 유저의 해당 와인에 대한 댓글이 있는 경우 생성 없이 내용만 갱신된다. (get_or_create)
        comment_data, created = Comment.objects.get_or_create(user=user, wine=wine)
        comment_data.comment = comment
        comment_data.rating = rating
        comment_data.save()

    
    # 삭제하는 경우 (DELETE)
    if request.method == 'DELETE':
        # 3. 댓글이 있는지 확인. 없으면 404 반환, 있으면 해당 댓글 삭제.
        comment_data = get_object_or_404(Comment, user=user, wine=wine)
        comment_data.delete()


    # 생성 또는 삭제가 된 경우 갱신된 댓글 데이터 반환
    comments = Comment.objects.filter(wine=wine)
    serializer = CommentSerializer(comments, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)
    
