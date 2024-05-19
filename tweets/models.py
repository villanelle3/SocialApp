from django.db import models
from django.db.models import Q
from django.conf import settings

User = settings.AUTH_USER_MODEL

class TweetLiked(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
    def feed(self, user):
        profiles_exist = user.following.exists()
        followed_users_ids = []
        if profiles_exist:
            followed_users_ids = user.following.all().values_list("user__id", flat=True) # [x.user.id for x in profiles].append(user.id)
        return self.filter(
            Q(user__id__in=followed_users_ids) |
            Q(user=user)       
        ).distinct().order_by("-timestamp")


class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):  # Corrigido aqui
        return TweetQuerySet(self.model, using=self._db)
    
    def feed(self, user):
        return self.get_queryset().feed(user)


class Tweet(models.Model):
    # id = models.AutoField(primary_key=True)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)    # Lógica para retweets
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    content = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, default=None, blank=True, related_name='tweet_user', through=TweetLiked)
    image = models.FileField(upload_to="images/", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = TweetManager()
    # def __str__(self):
    #     return self.content
    
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
