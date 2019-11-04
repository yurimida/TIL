from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import ProfileSerializer, ProfileDetailSerializer
from api.models import Profile, create_profile, update_subscribe, User
from django.contrib.auth import authenticate
import random


@api_view(['POST', 'GET','DELETE'])
def signup_many(request):
    if request.method == 'GET':
        id = request.GET.get('id', request.GET.get('profile_id', None))
        if id:
            profile = Profile.objects.filter(pk=id)
            cluster_label = profile[0].cluster
            profiles = list(Profile.objects.filter(cluster=cluster_label))
            profiles.remove(profile[0])
            if len(profiles) >= 6:
                profiles = random.sample(profiles, 6)
            profiles.insert(0, profile[0])
            serializer = ProfileDetailSerializer(profiles, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            profiles = Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        profiles = request.data.get("params", None)
        print(profiles)
        print("이게 뽑힌건가???")
        for profile in profiles:
            username = profile.get('username', None)
            password = profile.get('password', None)
            age = profile.get('age', None)
            occupation = profile.get('occupation', None)
            gender = profile.get('gender', None)
            image = profile.get('image', None)
            if not image:
                images = ['https://i.imgur.com/NLL5Wop.png', 'https://i.imgur.com/XsrbaXg.png',
                 'https://i.imgur.com/YwioUo7.png', 'https://i.imgur.com/yS9Qq3c.png','https://i.imgur.com/7cf1GCh.png',
                 'https://i.imgur.com/wflKtsz.png', 'https://i.imgur.com/sJXD3UJ.png']
                image = random.choice(images)

            create_profile(username=username, password=password, age=age,occupation=occupation, gender=gender, image=image)

        return Response(status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':
        id = request.GET.get('0', None)

        profile = Profile.objects.filter(pk=id)
        profile.delete()

        user = User.objects.filter(pk=id)
        user.delete()

        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def login(request):

    if request.method == 'POST':
        profile = request.data.get('params', None)
        print("여기로오는거야?")
        print(profile)
        username = profile.get('username', None)
        password = profile.get('password', None)
        # print(profile, 'profile')
        user = authenticate(username=username, password=password)

        print(user, 'what is user?')
        return Response(status=status.HTTP_200_OK)

# 2019.10.07 이찬호
# 기능 : 유저의 관리자 여부를 변경한다. true false
# 변수 : params(int id, boolean is_staff)
# 리턴 : response 200
@api_view(['POST'])
def setUserGrade(request):
    if request.method == 'POST':
        userInfo = request.data.get('params', None)
        id = userInfo.get('id', None)
        isAdmin = userInfo.get('isAdmin', None)
        print("왓냐")
        print(userInfo)
        users = User.objects.filter(pk=id)
        for user in users:
            print(user)
            user.is_staff = isAdmin
            user.save()

        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def update_user_subscribe(request):
    if request.method == 'POST':
        profile = request.data.get('params', None)
        id = profile['user_id']
        update_subscribe(id=id, days=31)

        return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def modify(request):
    if request.method == 'POST':
        find = request.data.get('params', None)
        print(find)

        id = find.get('id',None)
        age =  find.get('age',None)
        username =  find.get('username',None)
        gender =  find.get('gender',None)
        occupation =  find.get('occupation',None)
        image = find.get('image',None)
        print(id,age,username,gender,occupation)

        profile = Profile.objects.get(pk=id)
        user = User.objects.get(pk=id)
        user.username = username
        user.save()

        profile.age = age
        profile.gender = gender
        profile.occupation = occupation
        profile.image = image
        profile.save()
        return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def delete_user(request):
    if request.method == 'POST':
        data = request.data.get('params', None)
        id = data.get('id',None)
        print(id)
        profile = Profile.objects.get(pk=id)
        profile.delete()
        user = User.objects.get(pk=id)
        user.delete()
        return Response(status=status.HTTP_200_OK)
