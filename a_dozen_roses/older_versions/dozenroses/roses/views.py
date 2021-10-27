import json
from django.contrib.auth import authenticate, get_user, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

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
        
        # After creating and logging in a new user, create user scores
        for problem in Problem.objects.all():
            user_score = Score(problem=problem, user=user, score=100)
            user_score.save()
        
        return redirect(reverse("index"))
    else:
        return render(request, "roses/register.html")

def user(request):
    user = get_user(request)
    if user.id is None:
        return JsonResponse({'user': user.username})
    else:
        return JsonResponse({'user': user.username, 'level': user.level})

def problems(request):
    user = get_user(request)
    problems = Problem.objects.filter(level__lte = user.level)
    response = []
    for problem in problems:
        score = Score.objects.filter(user=user, problem=problem)[0].score
        response.append({
            'id': problem.id, 
            'problem': problem.problem, 
            'answer': problem.answer, 
            'level': problem.level,
            'score': score 
        })
    return JsonResponse(response, safe=False)
    
@csrf_exempt
def scores(request):
    level_score_threshold = 20
    move_up_a_level = True
    user = get_user(request)
    problems = json.loads(request.body)
    for problem in problems:
        score = problem['score']
        if score > level_score_threshold:
            move_up_a_level = False
        problem_to_update = Score.objects.filter(user=user, problem = problem['id'])[0]
        problem_to_update.score = score
        problem_to_update.save()
    if move_up_a_level:
        user.level += 1
        user.save()    
    return JsonResponse({'message': 'Scores Updated'})




