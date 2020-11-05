import json
from django.contrib.auth import authenticate, get_user, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from . import util
from .models import User, Problem, Score

def index(request):
    return render(request, "roses/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return redirect(reverse("index"))
        else:
            return render(request, "roses/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "roses/login.html")


def logout_view(request):
    logout(request)
    return redirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "roses/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "roses/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        util.create_user_problems(user)
        return redirect(reverse("index"))
    else:
        return render(request, "roses/register.html")

def user(request):
    user = get_user(request)
    return JsonResponse({'user': user.username})



