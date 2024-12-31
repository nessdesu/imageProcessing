import json
import tempfile
import os
import cv2
import numpy as np
import base64
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from image_processing.image_restoration_filters import ImageRestorationFilters


@csrf_exempt
def apply_restoration(request):
    if request.method == 'POST':
        # Yüklenen dosyayı al
        uploaded_file = request.FILES.get('image')
        if not uploaded_file:
            return JsonResponse({'error': 'No image uploaded'}, status=400)

        # Geçici dosya için güvenli bir yol oluştur
        temp_dir = tempfile.gettempdir()
        temp_path = os.path.join(temp_dir, uploaded_file.name)

        # Dosyayı geçici dizine kaydet
        with open(temp_path, 'wb') as temp_file:
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)

        # OpenCV ile resmi oku
        img = cv2.imread(temp_path)
        if img is None:
            return JsonResponse({'error': 'Invalid image format or unreadable file'}, status=400)

        # Filtre türünü ve diğer parametreleri al
        filter_type = request.POST.get('filter_type')
        if not filter_type:
            return JsonResponse({'error': 'Missing filter_type parameter'}, status=400)


        # Filtreleme işlemini uygula
        if filter_type == 'faulty_pixel_repair':
            repair_radius = request.POST.get('repair_radius')
            if not repair_radius:
                return JsonResponse({'error': 'Missing repair_radius parameter'}, status=400)
            try:
                restored_img = ImageRestorationFilters.apply_faulty_pixel_repair(img, int(repair_radius))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')


        elif filter_type == 'deblurring':
            kernel_size = request.POST.get('kernel_size')
            try:
                restored_img = ImageRestorationFilters.apply_deblurring(img, int(kernel_size))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')


        elif filter_type == 'inverse_filtering':
            filter_size = request.POST.get('filter_size')
            try:
                 restored_img = ImageRestorationFilters.apply_inverse_filter(img, int(filter_size))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        else:
            return JsonResponse({'error': 'Invalid filter_type parameter'}, status=400)
