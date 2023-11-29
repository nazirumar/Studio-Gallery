from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Categories(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
       
    def clean(self):
        self.title = self.title.capitalize()
        return super().clean()



class Gallery(models.Model):
    category = models.ForeignKey(Categories,on_delete=models.CASCADE)
    slug = models.SlugField()
    title = models.CharField(max_length=100)
    img = models.ImageField(upload_to='gallery/images')
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
    
    def clean(self):
        self.title = self.title.capitalize()
        return super().clean()




class Contact(models.Model):
    slug = models.SlugField()
    use = models.ForeignKey(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    message = models.TextField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.firstName
    


class Service(models.Model):
    slug = models.SlugField()
    title = models.CharField(max_length=100)
    desc =models.TextField()
    img = models.ImageField(upload_to='services/images')
    price = models.DecimalField(decimal_places=2, max_digits=100)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    