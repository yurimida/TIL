from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.Serializer):
    user = serializers.SerializerMethodField()
    comment = serializers.CharField()
    rating = serializers.IntegerField()

    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Comment
        fields = ['user', 'comment', 'rating']