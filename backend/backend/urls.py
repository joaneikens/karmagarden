from contrib.views import char_count
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from django.views.generic import TemplateView
from questions import views

router = routers.DefaultRouter()
router.register(r'questions', views.QuestionView, 'question')

print(router.urls)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    re_path("", TemplateView.as_view(template_name="index.html")),
]
