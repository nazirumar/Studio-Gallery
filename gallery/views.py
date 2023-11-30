from django.shortcuts import render
from django.views.generic import ListView
# Create your views here.
from . models import Gallery,Contact, Service



class  Home1View(ListView):
    model = Gallery
    template_name = 'index.html'

    

class  FullScreen(ListView):
    model = Gallery
    template_name = 'index-2.html'

    

class  Home3View(ListView):
    model = Gallery
    template_name = 'index-3.html'

    


class  ContactView(ListView):
    model = Contact
    template_name = 'contact.html'



class  ServiceView(ListView):
    model = Service
    template_name = 'services.html'


class  AboutView(ListView):
    model = Gallery
    template_name = 'about.html'



class  SingleView(ListView):
    model = Gallery
    template_name = 'single.html'