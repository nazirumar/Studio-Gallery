from django.shortcuts import render


from django.views.generic import ListView
# Create your views here.
from . models import Gallery,Contact, Service


class  IndexView(ListView):
    model = Gallery
    template_name = 'index.html'

    


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