from django.contrib import admin
from .models import Lecture,Enrolment,Student,Grade

# Register your models here.

admin.site.register(Student)
admin.site.register(Lecture)
admin.site.register(Enrolment)
admin.site.register(Grade)