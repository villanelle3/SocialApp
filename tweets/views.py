from django.shortcuts import render
from django.http import HttpResponse
from .models import Tweet

# Create your views here.
def home_view(request, *args, **kwargs):
    return HttpResponse("<p>Hello world<p/>")

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    # print(tweet_id)
    obj = Tweet.objects.get(id = tweet_id)
    return HttpResponse(f"<p>New tweet: {obj.content}<p/>")