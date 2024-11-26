from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class extenduser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email=models.EmailField(default="kishorekumar4735@gmail.com")
    adname = models.CharField(max_length=100, primary_key=True)
    
    def __str__(self) -> str:
        return f"{self.adname}"

class employee(models.Model):
    empname = models.CharField(max_length=100)
    empid = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
    dept = models.CharField(max_length=100)
    job = models.CharField(max_length=100)
    date = models.DateField()
    adname = models.ForeignKey(extenduser, on_delete=models.CASCADE)
