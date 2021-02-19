# Generated by Django 2.2.5 on 2021-02-18 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('address1', models.CharField(max_length=200)),
                ('call', models.CharField(max_length=200)),
                ('category', models.CharField(max_length=100, verbose_name='카테고리')),
            ],
        ),
    ]
