from django.shortcuts import render, redirect
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import url_has_allowed_host_and_scheme
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Tweet
from .forms import TweetForm
from .serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, "pages/home.html", context={"username":username}, status=200)


def local_tweets_list_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        # Tela de inicio para quem nao esta logado
        # return redirect("/login?next=/profile/update")
        pass
    return render(request, "tweets/list.html")

def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id":tweet_id})

def local_tweets_profile_view(request, username, *args, **kwargs):
    return render(request, "tweets/profile.html", context={"profile_username":username})


@api_view(["POST"])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        # return JsonResponse(serializer.data, status = 201)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


def tweet_create_view_DJANGO_ONLY(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if is_ajax(request=request):
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)

    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None

    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()

        if is_ajax(request=request):
            print("This is ajax")
            return JsonResponse(obj.serialize(), status=201)

        if next_url != None and url_has_allowed_host_and_scheme(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()

    if form.errors:
        if is_ajax(request=request):
            return JsonResponse(form.errors, status=400)

    return render(request, "components/forms.html", context={"form": form})


@api_view(["GET"])
def tweet_list_view(request, *args, **kwargs):
    QuerySet = Tweet.objects.all()
    username = request.GET.get("username")
    if username != None:
        QuerySet = QuerySet.filter(user__username__iexact=username)
    serializer = TweetSerializer(QuerySet, many=True)
    return Response(serializer.data)


def tweet_list_view_DJANGO_ONLY(request, *args, **kwargs):
    QuerySet = Tweet.objects.all()
    tweets_list = [x.serialize() for x in QuerySet]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


@api_view(["GET"])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    QuerySet = Tweet.objects.filter(id=tweet_id)
    if not QuerySet.exists():
        return Response({}, status=404)
    obj = QuerySet.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)


def tweet_detail_view_DAJNGO_PURE(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not found"
        status = 404

    return JsonResponse(data, status=status)


@api_view(["DELETE", "POST"])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    QuerySet = Tweet.objects.filter(id=tweet_id)
    if not QuerySet.exists():
        return Response({}, status=404)
    QuerySet = QuerySet.filter(user=request.user)
    if not QuerySet.exists():
        return Response({"message": "You cannot delete this tweet!"}, status=401)

    obj = QuerySet.first()
    obj.delete()
    return Response({"message": "Tweet removed!"}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    """
    id is required
    Like, unlike, retweet
    """
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):

        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")

        QuerySet = Tweet.objects.filter(id=tweet_id)

        if not QuerySet.exists():
            return Response({}, status=404)
        
        obj = QuerySet.first()

        if action == "Like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":  
            parent_obj = obj
            new_tweet = Tweet.objects.create(user=request.user, parent=parent_obj, content=content)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)

    return Response({"message": "okay"}, status=200)