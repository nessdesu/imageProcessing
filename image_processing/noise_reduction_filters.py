
import cv2
import numpy as np
from PIL.ImageOps import grayscale
from django.views.decorators.csrf import csrf_exempt
import ast
from scipy.signal import wiener


@csrf_exempt
class NoiseReductionFilters:
    @staticmethod
    def apply_median_filter(image, kernel):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return cv2.medianBlur(gray, kernel)

    @staticmethod
    def mean_filter(image, matrix):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        kernel = np.array(matrix, np.float32)
        return cv2.filter2D(gray, -1, kernel)

    @staticmethod
    def wiener_filter(image, kernel_size):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        filtered = wiener(gray, kernel_size)
        return filtered

    @staticmethod
    def bilateral_filter(image, diameter, sigma_color, sigma_space):
        return cv2.bilateralFilter(image, diameter, sigma_color, sigma_space)