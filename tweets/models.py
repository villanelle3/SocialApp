from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class TweetLiked(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Tweet(models.Model):
    # id = models.AutoField(primary_key=True)
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)    # Lógica para retweets
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, default=None, blank=True, related_name='tweet_user', through=TweetLiked)
    image = models.FileField(upload_to="images/", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
    
    class Meta:
        ordering = ["-id"]

    @property
    def is_retweet(self):
        return self.parent != None

    def serialize(self):
        return {
            "id": self.id, 
            "content": self.content, 
            "likes": 12
        }
