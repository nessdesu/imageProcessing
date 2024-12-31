import json
import tempfile
import os
import cv2
import numpy as np
from cv2.gapi import kernel
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from image_processing.noise_reduction_filters import NoiseReductionFilters


@csrf_exempt
def apply_noise_reduction(request):
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

        # Filtre türlerine göre işlem yapıyoruz
        if filter_type == 'median_filter':
            kernel = request.POST.get('kernel_size')
            try:
                filtered = NoiseReductionFilters.apply_median_filter(img, int(kernel))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', filtered)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'mean_filter':
            # Gelen matrix verisini JSON formatında alıyoruz
            matrix_str = request.POST.get('matrix')
            try:
                matris = json.loads(matrix_str)  # JSON olarak çözümleyip 2D matris olarak alıyoruz
            except json.JSONDecodeError as e:
                return JsonResponse({'error': 'Invalid matrix format', 'details': str(e)}, status=400)

            try:
                filtered = NoiseReductionFilters.mean_filter(img, matris)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', filtered)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'wiener_filter':
            kernel_size = request.POST.get('kernel_size')
            try:
                filtered = NoiseReductionFilters.wiener_filter(img, int(kernel_size))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', filtered)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'billateral_filter':
            diameter = request.POST.get('kernel_size')
            sigma_color = request.POST.get('sigma_color')
            sigma_space = request.POST.get('sigma_space')
            if not diameter or not sigma_color or not sigma_space:
                return JsonResponse({'error': 'Missing diameter, sigma_color or sigma_space parameter'}, status=400)
            try:
                filtered = NoiseReductionFilters.bilateral_filter(img, int(diameter), int(sigma_color),
                                                                  int(sigma_space))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', filtered)
            return HttpResponse(buffer.tobytes(), content_type='image/png')
        else:
            return JsonResponse({'error': 'Invalid filter_type'}, status=400)
