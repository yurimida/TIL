from django.db import models

# Create your models here.
class Posting(models.Model):
    title = models.CharField(max_length=200, default='')
    content = models.TextField(default='Default COMTENT')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}: {self.title[:20]}'

class Comment(models.Model):
    posting = models.ForeignKey(Posting,on_delete=models.CASCADE)
    content = models.CharField(max_length=200,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}: {self.content[:30]}'


