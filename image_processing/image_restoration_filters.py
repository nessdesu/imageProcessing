import cv2
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from numpy.ma.core import filled

@csrf_exempt

class ImageRestorationFilters:
    @staticmethod
    def apply_faulty_pixel_repair(image, repair_radius):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        mask = np.zeros_like(gray, dtype=np.uint8)
        mask[50:100, 50:100] = 255
        return cv2.inpaint(gray, mask, repair_radius, cv2.INPAINT_TELEA)

    @staticmethod
    def apply_deblurring(image, kernel_size):
        return cv2.GaussianBlur(image, (kernel_size, kernel_size), 0)

    @staticmethod
    def apply_inverse_filter(image, kernel_size):
        return cv2.filter2D(image, -1, kernel_size)