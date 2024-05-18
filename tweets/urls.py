from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    # http://localhost:8000/

    # path("", views.home_view),
    path("", views.local_tweets_list_view),

    path("tweets/<int:tweet_id>/", views.tweet_detail_view),
    path("<int:tweet_id>/", views.local_tweets_detail_view),

    path("react/", TemplateView.as_view(template_name="react.html")),
    path("create-tweet/", views.tweet_create_view),
    path("tweets/", views.tweet_list_view),
    path("api/tweets/action/", views.tweet_action_view),    
    path("api/tweets/<int:tweet_id>/delete/", views.tweet_delete_view),

]
