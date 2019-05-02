from django.shortcuts import render,redirect,get_object_or_404,HttpResponseRedirect
from django.views.decorators.http import require_GET,require_POST,require_http_methods
from accounts.forms import UserCreateForm, AuthenticationForm
from django.contrib.auth import login as auth_login, logout as auth_logout


def login(request):

    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, form.get_user())
