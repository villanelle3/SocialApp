from django.http import Http404
from django.shortcuts import render, redirect
from .models import Profile
from .forms import ProfileForm
import requests


# Create your views here.

def profile_update_view(request, *args, **kargs):
    if not request.user.is_authenticated:
        return redirect("/login?next=/profile/update")
    user = request.user
    my_profile = user.profile
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
    }
    form = ProfileForm(request.POST or None, instance=my_profile, initial=user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get("first_name")
        last_name = form.cleaned_data.get("last_name")
        email = form.cleaned_data.get("email")
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        profile_obj.save()
    
    context = {
        "form": form,
        "btn_label": "Save",
        "title": "Update Profile"
    }

    return render(request, "profiles/form.html", context)

def profile_detail_view(request, username, *args, **kargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj.followers.all()
    context = {
        "username": username,
        "profile": profile_obj,
        "is_following": is_following
    }
    return render(request, "profiles/details.html", context)

# def profile_detail_view(request, username, *args, **kwargs):
#     # Tentamos obter os dados do perfil da API
#     response = requests.get(f'http://localhost:8000/api/profiles/{username}/')

#     # Verificamos se a resposta é bem-sucedida
#     if response.status_code == 200:
#         profile_data = response.json()
#         # Pegamos os campos necessários da resposta da API
#         first_name = profile_data.get('first_name', '')
#         last_name = profile_data.get('last_name', '')
#         bio = profile_data.get('bio', '')
#         location = profile_data.get('location', '')
#         follower_count = profile_data.get('follower_count', 0)
#         following_count = profile_data.get('following_count', 0)
#         is_following = profile_data.get('is_following', False)

#         # Construímos o contexto com os dados obtidos
#         context = {
#             "username": username,
#             "first_name": first_name,
#             "last_name": last_name,
#             "bio": bio,
#             "location": location,
#             "follower_count": follower_count,
#             "following_count": following_count,
#             "is_following": is_following
#             # Adicione mais informações conforme necessário
#         }
#     else:
#         # Se a chamada da API falhar, continuamos mostrando os dados do perfil do banco de dados como antes
#         qs = Profile.objects.filter(user__username=username)
#         if not qs.exists():
#             raise Http404
#         profile_obj = qs.first()
#         is_following = False
#         if request.user.is_authenticated:
#             user = request.user
#             is_following = user in profile_obj.followers.all()
#         context = {
#             "username": username,
#             "profile": profile_obj,
#             "is_following": is_following
#         }

#     return render(request, "profiles/details.html", context)