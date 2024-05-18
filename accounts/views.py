from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        if user_ is not None:
            login(request, user_)
            return redirect("/")
    context = {
        "btn_label": "Login",
        "form": form,
        "title": "Login",
    }
    return render(request, "accounts/login.html", context)

def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "description": "Are you sure you want to logout?",
        "btn_label":"Click to confirm",
        "form": None,
        "title": "Logout",
    }
    return render(request, "accounts/logout.html", context)

def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=False)  # Salva o usuário sem cometer ainda
        user.set_password(form.cleaned_data.get("password1"))
        user.save()  # Agora salva o usuário com a senha definida
        login(request, user)  # Loga o usuário automaticamente
        return redirect("/")  # Redireciona para a página principal após o login
    context = {
        "btn_label": "Register",
        "form": form,
        "title": "Register",
    }
    return render(request, "accounts/registration.html", context)
