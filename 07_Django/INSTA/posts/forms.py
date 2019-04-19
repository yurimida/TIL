from django import forms
from .models import Post,Image,Comment

# 화면까지 커스텀
class PostModelForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = [
            'content',
        ]

class ImageModelForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['file',]
        widgets = {
            'file': forms.FileInput(attrs={'multiple':True})
        }

class CommentModelForm(forms.ModelForm):

    class Meta:
        model = Comment
        fields = [
            'content',
        ]
# 데이터 다 밀어넣으면 알아서 분류해줌(post,get), 저장까지
# 알아서 html로 보내줌
