from django.contrib.auth.models import AbstractUser
from django.db.models import Model, CharField, IntegerField, ForeignKey, CASCADE

# Create your models here.

class User(AbstractUser):
    pass

class Problem(Model):
    problem = CharField(max_length = 8)
    answer = IntegerField()
    level = IntegerField()

class Score(Model):
    problem = ForeignKey(Problem, on_delete=CASCADE)
    user = ForeignKey(User, on_delete=CASCADE, related_name="scores")
    score = IntegerField()

