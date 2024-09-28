from rest_framework import serializers
from .models import employee,extenduser
from rest_framework.response import Response
from rest_framework import validators
from django.contrib.auth.models import User
class Empdetail(serializers.ModelSerializer):
    class Meta:
        model = employee
        fields = '__all__'
    def validate(self, value):
        error={}
        value['empid']=value['empid'].upper()
        emp_instance=employee.objects.filter(email=value['email'])
        if self.instance is None and emp_instance:
            if emp_instance[0].adname == value['adname']:
                error['email'] ="email already exist"
        emp_instance=employee.objects.filter(empid=value['empid'])
        if self.instance is None and emp_instance:
            if emp_instance[0].adname == value['adname']:
                error["empid"] ="empid already exist"
        if error:
            raise serializers.ValidationError(error)
        else:
            return value
class admin(serializers.ModelSerializer):
    class Meta:
        model=User
        fields="__all__"
    def validate(self, attrs):
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError("user with email already exist")
        user = User(username=attrs['username'])
        user.set_password(attrs['password']) 
        attrs['password'] = user.password     
        return attrs
        
        
    
    
             
        
        
