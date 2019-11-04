# from rest_framework import status
# from rest_framework.decorators import api_view
# from api.models import Profile, update_profile_view_count, Summary
# from api.serializers import ProfileSerializer, ProfileDetailSerializer
# from rest_framework.response import Response
#
# @api_view(['GET', 'POST', 'DELETE'])
# def profiles(request):
#
#     if request.method == 'GET':
#         id = request.GET.get('id', request.GET.get('profile_id', None))
#         title = request.GET.get('title', None)
#         genres = request.GET.get('genres', None)
#         if genres == 'All':
#             genres = ''
#         sortBy = request.GET.get('sortBy', None)
#         isDetail = request.GET.get('isDetail', None)
#
#
#         # profile
#         profiles = Profile.objects.all()
#         if age:
#             profiles = profiles.filter(age=age)
#         if occupation:
#             profiles = profiles.filter(occupation=occupation)
#         if gender:
#             profiles = profiles.filter(gender=gender)
#
#         # movie
#         movies = Movie.objects.all()
#         if genres:
#             movies = movies.filter(genres__icontains=genres)
#
#         ratings = Rating.objects
#
#         gj = Rating.objects.select_related().values('movie').annotate(total=Count('movie'))
#         gj = Rating.objects.select_related()
#         gj = Rating.objects.select_related().annotate(total=Count('movie')).order_by('movie')
#
#         return Response(data=serializer.data, status=status.HTTP_200_OK)
#
#         return Response(status=status.HTTP_200_OK)
