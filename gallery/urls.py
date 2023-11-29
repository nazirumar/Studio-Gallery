from django.urls import path

from . views import(
    IndexView,
    ContactView,
    ServiceView,
    SingleView,
AboutView
)


urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path('contact', ContactView.as_view(), name='contact'),
    path('service', ServiceView.as_view(), name='service'),
    path('single', SingleView.as_view(), name='single'),
    path('about', AboutView.as_view(), name='about')
]
