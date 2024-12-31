import tempfile
import os
import cv2
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from image_processing.transformation_filters import TransformationFilters


@csrf_exempt
def apply_transformation(request):
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

        if filter_type == 'rotation':
            angle = request.POST.get('angle')
            if angle is None:
                return JsonResponse({'error': 'Missing angle parameter'}, status=400)

            try:
                rotated = TransformationFilters.apply_rotation(img, int(angle))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', rotated)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'scaling':
            scale_x = request.POST.get('scale_x')
            scale_y = request.POST.get('scale_y')
            if scale_x is None or scale_y is None:
                return JsonResponse({'error': 'Missing scale_x or scale_y parameter'}, status=400)

            try:
                scaled = TransformationFilters.apply_scaling(img, float(scale_x), float(scale_y))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', scaled)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'translation':
            x = request.POST.get('x')
            y = request.POST.get('y')
            if x is None or y is None:
                return JsonResponse({'error': 'Missing x or y parameter'}, status=400)

            try:
                translated = TransformationFilters.apply_translation(img, int(x), int(y))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', translated)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'fourier_transform':
            # Fourier dönüşümü işlemini uygula
            try:
                f_transform = TransformationFilters.apply_fourier_transform(img, int(request.POST.get('spec')))
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', f_transform)
            return HttpResponse(buffer.tobytes(), content_type='image/png')

        elif filter_type == 'wavelets_transform':
            # Wavelets dönüşümü işlemini uygula
            try:
                w_transform = TransformationFilters.apply_wavelets_transform(img)
            except cv2.error as e:
                return JsonResponse({'error': 'OpenCV error', 'details': str(e)}, status=500)
            _, buffer = cv2.imencode('.png', w_transform)
            return HttpResponse(buffer.tobytes(), content_type='image/png')