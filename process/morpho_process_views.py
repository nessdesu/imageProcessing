import json
import tempfile
import os
import cv2
import numpy as np
import base64
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from image_processing.morpho_process_filters import MorphoProcessFilters


@csrf_exempt
def apply_morpho_operations(request):
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

        if filter_type == 'dilation':
            kernel_size = request.POST.get('kernel_size')
            iterations = request.POST.get('iterations')
            try:
                dilation = MorphoProcessFilters.apply_dilation(img, int(kernel_size), int(iterations))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', dilation)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'erosion':
            kernel_size = request.POST.get('kernel_size')
            iterations = request.POST.get('iterations')
            try:
                erosion = MorphoProcessFilters.apply_erosion(img, int(kernel_size), int(iterations))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', erosion)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'opening':
            kernel_size = request.POST.get('kernel_size')
            iterations = request.POST.get('iterations')
            try:
                opening = MorphoProcessFilters.apply_opening(img, int(kernel_size), int(iterations))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', opening)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'closing':
            kernel_size = request.POST.get('kernel_size')
            iterations = request.POST.get('iterations')
            try:
                closing = MorphoProcessFilters.apply_closing(img, int(kernel_size), int(iterations))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', closing)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'skel':
            kernel_size = request.POST.get('kernel_size')
            try:
                skeleton = MorphoProcessFilters.apply_skeletonization(img, int(kernel_size))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', skeleton)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'hit_or_miss':
            matrix = request.POST.get('matrix')
            if not matrix:
                return JsonResponse({'error': 'Missing matrix parameter'}, status=400)
            try:
                matrix = json.loads(matrix)

                if len(matrix) != 3 or len(matrix[0]) != 3:
                    return JsonResponse({'error': 'Matrix must be 3x3'}, status=400)

                for row in matrix:
                    if len(row) != 3:  # Her satırın 3 eleman içerdiğinden emin olun
                        return JsonResponse({'error': 'Each row must have 3 values'}, status=400)

                hit_or_miss = MorphoProcessFilters.apply_hit_or_miss(img, matrix)

            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', hit_or_miss)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        else:
            return JsonResponse({'error': 'Invalid filter_type'}, status=400)
