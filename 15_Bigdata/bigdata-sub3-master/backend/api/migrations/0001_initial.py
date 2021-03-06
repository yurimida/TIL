# Generated by Django 2.2.4 on 2019-10-10 08:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Clustering',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('movie_label', models.IntegerField(default=0)),
                ('movie_cluster', models.CharField(max_length=100)),
                ('user_label', models.IntegerField(default=0)),
                ('user_cluster', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='KNN',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('knn_movie', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='MF',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('mf_movie', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('genres', models.CharField(max_length=500)),
                ('average_rating', models.FloatField(default=0)),
                ('total_rate', models.IntegerField(default=1)),
                ('view_cnt', models.IntegerField(default=0)),
                ('poster_url', models.CharField(max_length=500)),
                ('trailer', models.CharField(max_length=1000)),
                ('cluster', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Summary',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('body', models.CharField(max_length=3000)),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('rating', models.FloatField(default=0.0)),
                ('timestamp', models.DateTimeField()),
                ('movie', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Movie')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(default='M', max_length=10)),
                ('age', models.IntegerField(default=25)),
                ('occupation', models.CharField(max_length=200)),
                ('image', models.CharField(max_length=200)),
                ('cluster', models.IntegerField(default=0)),
                ('subscribe', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='movie',
            name='summary',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Summary'),
        ),
        migrations.AddField(
            model_name='movie',
            name='user',
            field=models.ManyToManyField(related_name='movie', to=settings.AUTH_USER_MODEL),
        ),
    ]
