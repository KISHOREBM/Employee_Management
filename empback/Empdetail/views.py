from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from .models import employee,extenduser
from .searilizer import Empdetail,admin
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
import numpy as np
@api_view(["POST"])
def create_emp(request):
    data=request.data
    # print(data)
    searilizer=Empdetail(data=data)
    if searilizer.is_valid():
        # print("hello1")
        searilizer.save()
        return Response({"detail":"true","info":"suscessfully created"})
    else:
        print(searilizer.errors)
        return Response({"detail":"false","info":searilizer.errors})
    
@api_view(['GET',"PUT","DELETE"])
def get_emp(request):
    if request.method == 'GET':
        # print("i am post")
        adname = request.query_params.get('adname')
        if not adname:
            return Response({"detail": "false","info":"adname parameter is required"}, status=400)
        
        try:
            emp_instance = employee.objects.filter(adname__adname=adname)
            data = Empdetail(emp_instance,many=True).data
            # print(data)
            if not data:
                return Response({"detail":"false","info":"Employee not found"})
            return Response({"detail":"true","info":data})
        except employee.DoesNotExist:
            return Response({"detail": "Employee not found"}, status=404)
    elif request.method=="PUT":
        # print("i am put")
        data=request.data
        emp_instanse=employee.objects.get(empid=data['value'])
        if  emp_instanse:
            searilizer=Empdetail(emp_instanse,data=data['data'],partial=True)
            if searilizer.is_valid():
                searilizer.save()
            print(searilizer.errors)
            return Response({"detail":"true","info":"loged in "})
        else:
            return Response({"detail":"false","info":"in valid user"})
            
    else:
        data=request.data
        # print(data)
        emp_instanse=employee.objects.get(empid=data['empid'])
        if emp_instanse :
            searilizer=Empdetail(emp_instanse)
            emp_instanse.delete()
            return Response(searilizer.data)
            
        else:
            return Response("error exist")
@api_view(['POST','GET'])
def sign_up(request):
    data=request.data
    searilizer=admin(data=data)
    if searilizer.is_valid():
        user=searilizer.save()
        # print(data)
        extuser=extenduser(user=user,adname=data['username'])
        extuser.save()
        return Response({"detail":"true","info":searilizer.data})
    else:
        # print("in else")
        return Response({"detail":"false","info":searilizer.errors})
@api_view(['POST',"GET"])
def user_login(request):
    data=request.data
    username=data['username']
    password=data['password']
    user=authenticate(username=username,password=password)
    print(user,username,password)
    if user:
        return Response({"value":"true","info":"suscessful logedin"})
    else:
        return Response({"value":"false","info":"Invalid username or password"})
        
    
@api_view(['POST','GET'])
def getoptverification(request):
    data=request.data
    
    message=''.join(map(str,np.random.randint(0,9,4)))
    
    heading='otp to login'
    
    receiver_mail=data.get('email')
    sender='rnsitcse1@gmail.com'
    # print("hello")
    send_mail(heading,f"your otp to login {message}",sender,[receiver_mail])
    return Response({'value':message,'detail':True})
