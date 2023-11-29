from django.contrib import admin
from .models import Gallery, Service, Categories, Contact
# Register your models here.

class GalleryAdmin(admin.ModelAdmin):
    list_display =['title', 'created', 'slug']
    

    prepopulated_fields ={'slug': ('title',)} 

class ServiceAdmin(admin.ModelAdmin):
    list_display =['title', 'desc', 'price', 'slug', 'created']
    prepopulated_fields ={'slug': ('title',)} 




class CategoryAdmin(admin.ModelAdmin):
    list_display =['title', 'slug', 'created']
    prepopulated_fields ={'slug': ('title',)} 




class ContactAdmin(admin.ModelAdmin):
    list_display =['firstName','lastName', 'email', 'slug', 'created']
    prepopulated_fields ={'slug': ('subject',)} 




admin.site.register(Gallery, GalleryAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Categories, CategoryAdmin)