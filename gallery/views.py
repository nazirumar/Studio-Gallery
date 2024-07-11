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

    




class  SingleView(ListView):
    model = Gallery
    template_name = 'single.html'


# ========================================================= Pages ===========================================

class  AboutView(ListView):
    model = Gallery
    template_name = 'about.html'



class  ContactView(ListView):
    model = Contact
    template_name = 'contacts.html'



class  ServiceView(ListView):
    model = Service
    template_name = 'services.html'



class  StripedView(ListView):
    model = Gallery
    template_name = 'about.html'


class  ImageBlogView(ListView):
    model = Gallery
    template_name = 'about.html'


class  VideoBgView(ListView):
    model = Gallery
    template_name = 'about.html'


class  Page404View(ListView):
    model = Gallery
    template_name = 'about.html'



# ====================================== Photo ===============================


class  VideoSlideView(ListView):
    model = Gallery
    template_name = 'about.html'


class  ShiftSlideView(ListView):
    model = Gallery
    template_name = 'shift-slider.html'


class  RibbonGalleryView(ListView):
    model = Gallery
    template_name = 'gallery-ribbon.html'


class  FlowGalleryView(ListView):
    model = Gallery
    template_name = 'about.html'

class  GridGallery1View(ListView):
    model = Gallery
    template_name = 'about.html'




class  GridGallery2View(ListView):
    model = Gallery
    template_name = 'about.html'



class  FullScreenGalleryView(ListView):
    model = Gallery
    template_name = 'about.html'


class  PackeryGalleryView(ListView):
    model = Gallery
    template_name = 'about.html'



class  KenburnsSlideView(ListView):
    model = Gallery
    template_name = 'about.html'




