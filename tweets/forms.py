from django import forms
from .models import Tweet
from django.conf import settings

MAX_LENGTH = settings.MAX_LENGTH

class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ["content"]

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_LENGTH:
            raise forms.ValidationError(f"This tweet is too long! Max length: {MAX_LENGTH}")
        return content

