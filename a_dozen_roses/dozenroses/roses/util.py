from .models import User, Problem, Score

def create_user_problems(user):
    problems = Problem.objects.all()
    for problem in problems:
        user_score = Score(problem=problem, user=user, score=100)
        user_score.save()

