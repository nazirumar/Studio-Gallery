# Generated by Django 4.2.7 on 2023-11-28 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gallery',
            name='img',
            field=models.ImageField(default='', upload_to='gallery/images'),
            preserve_default=False,
        ),
    ]
