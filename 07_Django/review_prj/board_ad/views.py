from django.shortcuts import render,redirect,get_object_or_404
from .models import Posting, Comment
from django.views.decorators.http import require_http_methods


def posting_list(request):
    postings = Posting.objects.all()
    return render(request, 'board_ad/list.html', {'postings': postings}, )

def posting_detail(request,posting_id):
    posting = get_object_or_404(Posting,id=posting_id)
    comments = posting.comment_set.all()
    return render(request, 'board_ad/detail.html', {'posting': posting, 'comments':comments }, )

@require_http_methods(['GET','POST'])
def posting_create(request):
    if request.method == 'GET':
        return render(request, 'board_ad/new.html')
    else:
        posting = Posting()
        posting.title = request.POST.get('title')
        posting.content = request.POST.get('content')
        posting.save()
        return redirect('board_ad:posting_detail', posting_id=posting.id)

# Update
def posting_update(request,posting_id):
    if request.method == 'GET':
        posting = Posting.objects.get(id=posting_id)
        return render(request, 'board_ad/edit.html',{'posting':posting})

    elif request.method =='POST':
        posting = Posting.objects.get(id=posting_id)
        posting.title = request.POST.get('title')
        posting.content = request.POST.get('content')
        posting.save()
        return redirect('board_ad:posting_detail', posting_id=posting.id)

# Delete
@require_http_methods(['POST'])
def posting_delete(request,posting_id):
    posting = get_object_or_404(Posting, id=posting_id)
    posting.delete()
    return redirect('board_ad:posting_list')

# Comment
@require_http_methods(['POST'])
def create_comment(request,posting_id):
    posting = get_object_or_404(Posting, id = posting_id)
    comment = Comment()
    comment.content= request.POST.get('comment')
    comment.posting = posting
    comment.save()
    return redirect('board_ad:posting_detail', posting_id=posting.id)


@require_http_methods(['POST'])
def delete_comment(request,posting_id,comment_id):
    posting = get_object_or_404(Posting, id=posting_id)
    comment= get_object_or_404(Comment, id=comment_id)
    comment.delete()
    return redirect('board_ad:posting_detail', posting_id=posting.id)