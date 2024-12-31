import json
import tempfile
import os
import cv2
import numpy as np
import base64
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from image_processing.segmentation_filters import SegmentationFilters


@csrf_exempt
def apply_segmentation(request):
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

        if filter_type == 'otsu_method':
            first_value = request.POST.get('first_value')
            second_value = request.POST.get('second_value')
            if first_value is None:
                return JsonResponse({'error': 'Missing otsu_value parameter'}, status=400)

            # Otsu method işlemini uygula
            try:
                _, otsu = SegmentationFilters.apply_otsu(img, int(first_value), int(second_value))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', otsu)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'adaptive_threshold':
            block_size = request.POST.get('block_size')
            constant = request.POST.get('c')
            color = request.POST.get('color')
            if block_size is None or constant is None or color is None:
                return JsonResponse({'error': 'Missing block_size or constant or color parameter'}, status=400)

            # Adaptive threshold işlemini uygula
            try:
                mean_threshold, gaussian_threshold = SegmentationFilters.apply_adaptive_threshold(img, int(block_size), int(constant), int(color))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, mean_buffer = cv2.imencode('.png', mean_threshold)
            _, gaussian_buffer = cv2.imencode('.png', gaussian_threshold)
            mean_image = mean_buffer.tobytes()
            gaussian_image = gaussian_buffer.tobytes()

            response = HttpResponse(content_type="image/png")
            response['Content-Disposition'] = 'inline; filename="mean_threshold.png"'
            response.write(mean_image)

            # You can also return both images in a single response, but typically it's handled as two separate endpoints for clarity.
            return HttpResponse(content=gaussian_image, content_type="image/png")

        elif filter_type == 'canny_edge':
            threshold1 = request.POST.get('threshold1')
            threshold2 = request.POST.get('threshold2')
            if threshold1 is None or threshold2 is None:
                return JsonResponse({'error': 'Missing canny_value parameter'}, status=400)

            try:
                canny = SegmentationFilters.apply_canny_edge(img, int(threshold1), int(threshold2))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', canny)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'watershed_segmentation':
            iteration = request.POST.get('iteration')
            if iteration is None:
                return JsonResponse({'error': 'Missing iteration parameter'}, status=400)
            try:
                watershed = SegmentationFilters.apply_watershed_segmentation(img, int(iteration))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', watershed)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'region_growing':
            seedx = request.POST.get('seed_x')
            seedy = request.POST.get('seed_y')
            lo_diff = request.POST.get('l_diff')
            up_diff = request.POST.get('h_diff')
            if seedx is None or seedy is None or lo_diff is None or up_diff is None:
                return JsonResponse({'error': 'Missing seedx or seedy or lo_diff or up_diff parameter'}, status=400)
            try:
                region_growing = SegmentationFilters.apply_region_growing(img, int(seedx), int(seedy), int(lo_diff), int(up_diff))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', region_growing)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        else:
            return JsonResponse({'error': 'Invalid filter_type parameter'}, status=400)
