from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from django.contrib.auth.decorators import login_required
from .models import Post, Image
from .form import PostModelForm, ImageModelForm,CommentModelForm


# 교수님이 코드 다시 깔끔하게 바꿈

@login_required
@require_http_methods(['GET', 'POST'])
def update_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if post.user == request.user:  # 지금 수정하려는 post 작성자가 요청 보낸 사람이냐?
        if request.method == 'POST':
            post_form = PostModelForm(request.POST, instance=post)
            if post_form.is_valid():
                post_form.save()
                return redirect('posts:post_list')

        else:
            post_form = PostModelForm(instance=post)

        return render(request, 'posts/form.html', {
            'post_form': post_form,
        })

    else:
    # 작성자와 요청 보낸 user가 다르다면,
    # 403 : forbidden 금지됨!
        return redirect('posts:post_list')


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

            post = post_form.save(commit=False)
            post.user = request.user
            post.save()
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
        'image_form': image_form,
    })


@login_required
@require_GET
def post_list(request):
    if request.GET.get('next'):
        return redirect(request.GET.get('next'))
    posts = Post.objects.all()
    comment_form = CommentModelForm()

    return render(request, 'posts/list.html', {
        'posts': posts,
        'comment_form':comment_form,

    })

@login_required
@require_POST
def create_comment(request,post_id):
    post = get_object_or_404(Post, id = post_id)
    comment_form = CommentModelForm(data=request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.user = request.user
        comment.post = post
        comment.save()
        return redirect('posts:post_list')
    # todo나 fixme는 pycharm이 highlight해주는 기능임
    # TODO : else => comment 가 유효하지 않으면 어떻게 하지?
    # TODO : else => if comment is not vaild than what?

    return render(request, 'posts/form.html', {
        'comment_form': comment_form,

    })
