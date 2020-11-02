from .models import User, Problem, Score

def create_user_problems(user):
    problems = Problem.objects.all()
    for problem in problems:
        user_score = Score(problem, user, 100)
        user_score.save()

