from django.contrib import admin
from . models import Tweet, TweetLiked

# Register your models here.

class TweetLikedAdm(admin.TabularInline):
    model = TweetLiked

class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikedAdm]
    list_display = ["__str__", "user"]
    search_fields = ["content", "user__username", "user__email"]
    class Meta:
        model = Tweet

admin.site.register(Tweet, TweetAdmin)

