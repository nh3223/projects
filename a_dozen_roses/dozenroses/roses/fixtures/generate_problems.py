import json

'''
This file creates the problems and answers for the math facts application.  It saves the problems as a json file which
is then loaded as a fixture into the database with Django.
'''

def addition():
    return [(f'{x} + {y}', x + y, level(x, y, 'addition')) for x in range(13) for y in range(13)]
    
def multiplication():
    return [(f'{x} x {y}', x * y, level(x, y, 'multiplication')) for x in range(13) for y in range(13)]

def subtraction():
    return [(f'{x + y} - {x}', y, level(x, y, 'subtraction')) for x in range(13) for y in range(13)]
    
def division():
    return [(f'{x * y} {chr(247)} {x}', y, level(x, y, 'division')) for x in range(1,13) for y in range(13)]

def level(x, y, operation):
    levels = {'addition': [1,3,5], 'subtraction': [2,4,6], 'multiplication': [7,9,11], 'division': [8,10,12]}
    if x < 5 and y < 5:
        return levels[operation][0]
    if x < 9 and y < 9:
        return levels[operation][1]
    return levels[operation][2]

def convert_to_json(i, problem):
    return {
        "model": "roses.problem",
        "pk": i,
        "fields": {
            "problem": problem[0],
            "answer": problem[1],
            "level": problem[2]
        }
    }

def main():
    problems = addition() + subtraction() + multiplication() + division()
    fixture = [convert_to_json(i, problem) for i, problem in enumerate(problems)]
    with open('problems.json', 'w') as f:
        json.dump(fixture, f)

if __name__ == "__main__":
    main()

