from django.shortcuts import render,redirect
from .models import Writer.,Book,Chapter
from .forms import *
# Create your views here.



def create(request):
    if request.method == 'POST':
        form = WriterModelForm(request.POST)
        if form .is_valid(): # 지금 request.POST에 있는 데이터가 저장 가능해?
            form.save()
            return redirect('성공')
        else:
            pass
    elif request.method == 'GET':
        form = WriterModelForm()  # view에서 새 종이 하나를 만들어줬고
    return render(request,'new.html',{
        'form':form
    })


def update(request,id):
    writer = Writer.objects.get(id=id)
    if request.method == 'POST':
        form = WriterModelForm(request.POST, instance=writer) # instance만 더해주면 수정로직이됨!
        if form.is_valid():
            form.save()
            return redirect('성공')

        else:
            pass

    elif request.method == 'GET':
        form =WriterModelForm() # 비어있는 종이를 주는게 아니라 내가 만들어놓은 form종이를 줌.
    return render(request,'edit.html',{
       'form':form
    })

# def new(request):
#     return render()
# def create(request):
#     writer = Writer()
#     writer.name = request.POST.get('name')
#     writer.save()
#     return redirect()
#
# def edit(request,id):
#     writer =Writer.objects.get(id=id)
#     return render(request,'edit.html',{'writer':writer})
# def delete(request,id)
