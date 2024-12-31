from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from process import views, segmentation_views, transformation_views, noise_reduction_views, image_restoration_views
from process.color_image_views import color_image
from process.morpho_process_views import apply_morpho_operations

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('process.urls')),  # Diğer API URL'leri
    path('', TemplateView.as_view(template_name='index.html')),  # Ana sayfa (React uygulamanızın index.html dosyasını yükler)
    path('apply-filter/', views.apply_filter, name='apply_filter'),  # Filtre işlemleri için genel URL
    path('apply-segmentation/', segmentation_views.apply_segmentation, name='apply_segmentation'),  # Segmentasyon işlemleri için genel URL
    path('apply-transformation/', transformation_views.apply_transformation, name='apply_transformation'),
    path('noise-reduction/', noise_reduction_views.apply_noise_reduction, name='apply_noise_reduction'),
    path('apply-restoration/', image_restoration_views.apply_restoration, name='apply_restoration'),# Restorasyon işlemleri için genel URLs
    path('apply_color_image/', color_image, name='apply_color_image'),
    path('apply-morpho-operations/',apply_morpho_operations, name='apply_morpho_operations'),
]
