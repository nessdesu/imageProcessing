import json
import tempfile
import os
import cv2
import numpy as np
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from numpy.matrixlib.defmatrix import matrix

from image_processing.filters import ImageFilters



@csrf_exempt
def apply_filter(request):
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

        if filter_type == 'threshold':
            # Threshold parametresini al
            threshold_value = request.POST.get('threshold_value')
            if threshold_value is None:
                return JsonResponse({'error': 'Missing threshold_value parameter'}, status=400)

            # Threshold işlemini uygula
            try:
                _, thresholded = ImageFilters.apply_threshold(img, int(threshold_value))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)

            # İşlenen resmi döndür
            _, buffer = cv2.imencode('.png', thresholded)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        # Average filtresi uygulama
        elif filter_type == 'average':
            # Ortalama filtre parametresini al
            kernel_size = request.POST.get('kernel_size')
            if kernel_size is None:
                return JsonResponse({'error': 'Missing kernel_size parameter'}, status=400)

            # Ortalama filtre işlemini uygula
            try:
                blurred = ImageFilters.apply_average_filter(img, int(kernel_size))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)

            # İşlenen resmi döndür
            _, buffer = cv2.imencode('.png', blurred)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        # Gaussian filtresi uygulama
        elif filter_type == 'gaussian':
            matrix = request.POST.get('matrix')
            matrix = json.loads(matrix) if matrix else None
            try:
                gaussian_blurred = ImageFilters.apply_gaussian_filter(img, matrix)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', gaussian_blurred)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        # Histogram eşitleme uygulama
        elif filter_type == 'histogram_equalization':
            try:
                histogram = ImageFilters.apply_histogram(img)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', histogram)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'a_histogram_equalization':
            clipLimit = request.POST.get('clipLimit')
            tileSize= request.POST.get('tileSize')
            try:
                tileGridSize = int(tileSize)
                tileGridSize = (tileGridSize, tileGridSize)
                a_histogram = ImageFilters.a_histogram_equalization(img, float(clipLimit), tileGridSize)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', a_histogram)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'sobel':
            matrix = request.POST.get('matrix')
            matrix = json.loads(matrix) if matrix else None
            try:
                sobel = ImageFilters.apply_sobel(img, matrix)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', sobel)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'laplace':
            matrix = request.POST.get('matrix')
            matrix = json.loads(matrix) if matrix else None
            try:
                laplace = ImageFilters.apply_laplace(img, matrix)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', laplace)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        else:
            return JsonResponse({'error': 'Invalid filter_type'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
