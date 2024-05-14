from rest_framework import serializers
from .models import Tweet
from django.conf import settings

MAX_LENGTH = settings.MAX_LENGTH
class TweetSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source="user.username")
    # avatar = serializers.ReadOnlyField(source="user.avatar.url")
    
    class Meta:
        model = Tweet
        fields = [
            "content",
        ]

    def validate_content(self, value):
        if len(value) > MAX_LENGTH:
            raise serializers.ValidationError(f"This tweet is too long! Max length: {MAX_LENGTH}")
        return value
