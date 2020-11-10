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
    available_scores = np.array([problem.score for problem in available_score_objects])
    available_sum = np.sum(available_scores)
    available_probabilities = available_scores / available_sum    
    problems = np.random.choice(available_problems, 12, replace=False, p=available_probabilities)
    return [Problem.objects.get(pk=problem) for problem in problems]

def get_written_numbers():
    written_numbers = [number_text(x) if x < 100 else f'one hundred {number_text(x-100)}' for x in range(145)]
    written_numbers[100] = 'one hundred'
    return {written_numbers[i]: i for i in range(145)}

def number_text(number):        
    single_digits = ['zero','one','two','three','four','five','six','seven','eight','nine']
    teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
    tens = [None, None,'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'] 
    if number < 10:
        return single_digits[number]
    if number < 20:
        return teens[number - 10]
    if number % 10 == 0:
        return tens[number // 10]
    return f'{tens[number // 10]} {single_digits[number % 10]}'

def get_progress(user):
    problems = Problem.objects.filter(level__lte = user.level)
    progress = 0
    total = 0
    for problem in problems: 
        score = Score.objects.filter(user=user, problem=problem)[0].score
        if problem.level < user.level:
            total += 1
            if score <= 20:
                progress += 1
        else:
            total += 9
            if score <= 20:
                progress += 9
    print(progress, total, progress / total)
    return int(100 * progress / total)

def update_results(user, problems):
    for problem in problems:
        score = np.exp(problem['time'])
        problem_to_update = Score.objects.filter(user=user, problem = problem['id'])[0]
        problem_to_update.score = score
        problem_to_update.save()