from django.contrib import admin
from .models import Article
# Article 모델을 관리자 페이지에서 확인할래

admin.site.register(Article)