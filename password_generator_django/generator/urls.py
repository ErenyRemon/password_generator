# generator/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('generate-password/', views.generate_password, name='generate-password'),
]
