from django.views.generic import TemplateView
from django.urls import path

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),  # React'in index.html dosyasını yükler
    # diğer url patternleriniz
]
