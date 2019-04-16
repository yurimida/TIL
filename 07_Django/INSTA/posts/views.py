from django.shortcuts import render,redirect,get_object_or_404
from django.views.decorators.http import require_GET,require_POST,require_http_methods
from django.contrib.auth.decorators import login_required
from .models import Post,Image
from .form import PostModelForm, ImageModelForm

# 교수님이 코드 다시 깔끔하게 바꿈

@login_required
@require_http_methods(['GET', 'POST'])
def update_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        post_form = PostModelForm(request.POST, instance=post)
        if post_form.is_valid():
            post_form.save()
            return redirect('posts:post_list')
        else:
            pass
    else:
        post_form = PostModelForm(instance=post)
    return render(request, 'posts/form.html', {
        'post_form': post_form,
    })

@login_required
@require_http_methods(['GET', 'POST'])
def create_post(request):
    if request.method == 'POST':

        post_form = PostModelForm(request.POST)

        # POST 방식으로 넘온 Data 를 ModelForm 에 넣는다.

        # POST 방식으로 넘온 Data 를 ModelForm 에 넣는다.
        # form = PostModelForm(request.POST, request.FILES)

        # Data 검증을 한다.
        if post_form.is_valid():
            # 통과하면 저장한다.
            post = post_form.save()
            for image in request.FILES.getlist('file'):
                request.FILES['file'] = image  # 딕셔너리 처럼 사용됨. model form이 dic형식으로 밖에 못읽음
                image_form = ImageModelForm(files=request.FILES)
                if image_form.is_valid():
                    # image = Image()
                    # image.file = request.FILE.get('skjd')
                    image = image_form.save(commit=False)
                    image.post = post
                    image.save()



            return redirect('posts:post_list')
        else:
            # 실패하면, 다시 data 입력 form 을 준다.
            pass
    # GET 방식으로 요청이 오면,
    else:
        post_form = PostModelForm()
    image_form = ImageModelForm()

    return render(request, 'posts/form.html', {
        'post_form': post_form,
        'image_form':image_form,
    })

@login_required
@require_GET
def post_list(request):
    if request.GET.get('next'):
        return redirect(request.GET.get('next'))
    posts = Post.objects.all()

    return render(request, 'posts/list.html', {
        'posts': posts,

    })






