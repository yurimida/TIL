from django.db import models
from django_extensions.db.models import TimeStampedModel,TitleDescriptionModel
# Create your models here.
# class TimeStamp(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     # 이러면 TimeStamp라는 테이블이 생겨버림
#     class Meta:
#         abstract = True  # 이렇게 하면 migrate에 영향을 안받음.

class MagazineArticle(TitleDescriptionModel,TimeStampedModel):
    content = models.TextField()

class Writer(TimeStampedModel): # TimeStamp가 이미 models.Model을 받고 있기 때문에 따로 써줄필요가 없음.
    name = models.CharField(max_length=100, default='')

    def __str__(self):
        return f'{self.id}: {self.name}'
class Book(TitleDescriptionModel,TimeStampedModel):
    author = models.ForeignKey(Writer, on_delete=models.PROTECT)
    # author의 author_id를 identity로 여겨서 써주는것임. Database의 한계 때문임.
    # title = models.CharField(max_length=100, unique=True)
    # description = models.TextField()
    def __str__(self):
        return f'{self.id}: {self.title}'

class Chapter(TitleDescriptionModel,TimeStampedModel):
    # title , description, created,modified
    book = models.ForeignKey(Book,on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id}: {self.book}'

class Student(models.Model):
    name = models.CharField(max_length=20)
    def __str__(self):
        return f'{self.id} {self.name}'

class Message(models.Model):
    student =models.ForeignKey(Student,on_delete=models.CASCADE)
    content = models.CharField(max_length=30)
    def __str__(self):
        return f'{self.id} {self.content}'

class Reply(models.Model):
    student = models.ForeignKey(Student,on_delete=models.CASCADE)
    message = models.ForeignKey(Message,on_delete=models.CASCADE)
    content = models.CharField(max_length=30)
    def __str__(self):
        return f'{self.id} {self.content}'