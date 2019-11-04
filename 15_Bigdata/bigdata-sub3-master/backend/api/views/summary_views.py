from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Summary
from api.serializers import SummarySerializer


@api_view(['GET', 'POST', 'DELETE'])
def summaries(request):
    if request.method == 'GET':
        summaries = Summary.objects.all()
        serializer = SummarySerializer(summaries, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        summaries = request.data.get('summaries', None)
        for summary in summaries:
            id = summary.get('id', None)
            body = summary.get('body', None)
            Summary(id=id, body=body).save()
        return Response(status=status.HTTP_201_CREATED)
