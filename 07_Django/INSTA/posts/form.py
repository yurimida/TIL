from django import forms
from .models import Post

# 화면까지 커스텀
class PostModelForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'

