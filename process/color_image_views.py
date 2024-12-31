import json
import tempfile
import os
import cv2
import numpy as np
import base64

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from image_processing.color_image_filters import ColorImageFilters

@csrf_exempt
def color_image(request):
    if request.method == 'POST':
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

        if filter_type == 'rgb2hsv':
            try:
                restored_img = ColorImageFilters.apply_rgb_to_hsv(img)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'rgb2cmyk':
            try:
                restored_img = ColorImageFilters.apply_rgb_to_cmky(img)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'low_pass':
            mask_size = int(request.POST.get('mask_size'))
            kernel = int(request.POST.get('kernel'))
            try:
                restored_img = ColorImageFilters.apply_low_pass_filter_in_frequency_area(img,kernel, mask_size)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'high_pass':
            mask_size = int(request.POST.get('mask_size'))
            try:
                restored_img = ColorImageFilters.apply_high_pass_filter_in_frequency_area(img, mask_size)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'band_pass':
            low = request.POST.get('low')
            high = request.POST.get('high')
            try:
                restored_img = ColorImageFilters.apply_band_pass_filter(img, int(low), int(high))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'band_stop':
            low = request.POST.get('low')
            high = request.POST.get('high')
            try:
                restored_img = ColorImageFilters.apply_band_stop_filter(img, int(low), int(high))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', restored_img)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        else:
            return JsonResponse({'error': 'Invalid filter_type parameter'}, status=400)