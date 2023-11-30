from django.urls import path

from . views import(
    Home3View,
    FullScreen,
    Home1View,
    ContactView,
    ServiceView,
    SingleView,
AboutView
)


urlpatterns = [
    path('', Home1View.as_view(), name='home_creative_2'),
    path('home_fullscreen', FullScreen.as_view(), name='home_fullscreen'),
    path('home_creative_3', Home3View.as_view(), name='home_creative_3'),
    path('contact', ContactView.as_view(), name='contact'),
    path('service', ServiceView.as_view(), name='service'),
    path('single', SingleView.as_view(), name='single'),
    path('about', AboutView.as_view(), name='about')
]
