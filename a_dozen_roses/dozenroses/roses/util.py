import numpy as np

from .models import User, Problem, Score


def create_user_problems(user):
    problems = Problem.objects.all()
    for problem in problems:
        user_score = Score(problem=problem, user=user, score=100)
        user_score.save()

def get_problems(user):
    available_problems = np.array(list(Problem.objects.values_list('id').filter(level__lte = user.level))).flatten()
    available_score_objects = [Score.objects.filter(problem=problem, user=user).first() for problem in available_problems]
    print(available_score_objects)
    available_scores = np.array([problem.score for problem in available_score_objects])
    print(available_scores)
    available_sum = np.sum(available_scores)
    available_probabilities = available_scores / available_sum
    print(available_problems)
    print(available_probabilities)
    
    
    problems = np.random.choice(available_problems, 12, replace=False, p=available_probabilities)
    print(problems)
    return [Problem.objects.get(pk=problem) for problem in problems]

