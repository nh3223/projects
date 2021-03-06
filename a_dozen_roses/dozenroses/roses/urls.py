from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.register, name='register'),
    path('user', views.user, name='user'),
    path('problems', views.problems, name='problems'),
    path('scores', views.scores, name='scores'),
]