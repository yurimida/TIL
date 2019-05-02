from django.shortcuts import render, redirect, get_object_or_404,HttpResponseRedirect
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from django.http import JsonResponse,HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
from .models import Post, Image,HashTag
from django.contrib import messages
from posts.forms import PostModelForm,ImageModelForm, CommentModelForm
from IPython import embed


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

                #update hashtag
                post.tags.clear()  # 기존의 tag() 다 날려줘
                content = post_form.cleaned_data.get('content')
                words = content.split(' ')  # 띄어쓰기 기준으로 split
                for word in words:
                    if word[0] == '#':
                        word = word[1:]
                        tag = HashTag.objects.get_or_create(
                            content=word)  # HashTag objects, True(있어서 가져왔어요) False(없어서 만들었어요)
                        post.tags.add(tag[0])
                        if tag[1]:  # tag가 처음 만들어 진거라면
                            messages.add_message(request, messages.SUCCESS, f'{tag[0].content}를 처음으로 추가하셨어요! :)')



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

            # Create hashtag => <input name='tags' /> # hi #ssafy #20층
            content = post_form.cleaned_data.get('content')
            words = content.split(' ') # 띄어쓰기 기준으로 split
            for word in words:
                if word[0] == '#':
                    word = word[1:]
                    tag =  HashTag.objects.get_or_create(content=word) # HashTag objects, True(있어서 가져왔어요) False(없어서 만들었어요)
                    post.tags.add(tag[0])
                    if tag[1]: # tag가 처음 만들어 진거라면
                        messages.add_message(request,messages.SUCCESS,f'{tag[0].content}를 처음으로 추가하셨어요! :)')

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
        return HttpResponseRedirect(request.META.get('HTTP_REFERER','/insta/'))
    # todo나 fixme는 pycharm이 highlight해주는 기능임
    # TODO : else => comment 가 유효하지 않으면 어떻게 하지?
    # TODO : else => if comment is not vaild than what?

    return render(request, 'posts/form.html', {
        'comment_form': comment_form,

    })

@login_required
@require_POST
def toggle_like(request, post_id):
    if request.is_ajax():
        user = request.user
        post = get_object_or_404(Post, id=post_id)
        is_active = True
        # 하나의 포스트에 => 좋아요한 사람들 중 => id==user.id 인 사람을 필터로 찾고 있으면 [value]/ 없으면 []
        # if post.like_users.filter(id=user.id).exists():

        if user in post.like_users.all():
            post.like_users.remove(user)
            is_active = False
        else:
            post.like_users.add(user)

        return JsonResponse({'likeCount':post.like_users.count(),
                             'is_active': is_active, })

    else:
        return HttpResponseBadRequest()

@require_GET
def tag_posts_list(request,tag_name):
    tag = get_object_or_404(HashTag, content=tag_name)
    posts = tag.posts.all()
    comment_form = CommentModelForm()
    return render(request,'posts/list.html',{
        'posts':posts,
        'comment_form':comment_form,
        'hi':f'#{tag} 를 포함한 posts 입니다.'
    })
# def delete_like(request,post_id):
#     user = request.user
#     post = get_object_or_404(Post, id=post_id)
#     if post.like_users.filter(id=user.id).exists():  # 찾으면, [value]/ 없으면, []
#     # if user in post.like_users.all():
#         post.like_users.remove(user)
#     else:
#         post.like_users.add(user)

