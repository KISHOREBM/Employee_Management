from django.contrib import admin
from django.urls import path
from .views import create_emp,get_emp,user_login,sign_up
urlpatterns=[
    path("createmp/",create_emp),
    path("getemp/",get_emp),
    path("login/",user_login),
    path("signup/",sign_up),
]