from django import forms
from .models import Post,Image

# 화면까지 커스텀
class PostModelForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = '__all__'

class ImageModelForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['file',]
        widgets = {
            'file': forms.FileInput(attrs={'multiple':True})
        }

# 데이터 다 밀어넣으면 알아서 분류해줌(post,get), 저장까지
# 알아서 html로 보내줌
