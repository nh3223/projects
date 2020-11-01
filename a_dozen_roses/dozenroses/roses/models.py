from django.contrib.auth.models import AbstractUser
from django.db.models import Model, CharField, IntegerField, ForeignKey, FloatField

# Create your models here.

class User(AbstractUser):
    pass

class Problem(Model):
    problem = CharField(max_length = 8)
    answer = IntegerField()

class Time(Model):
    problem = ForeignKey(Problem, on_delete=CASCADE, related_name="times")
    user = ForeignKey(User, on_delete=CASCADE, related_name="times")
    time = FloatField()
