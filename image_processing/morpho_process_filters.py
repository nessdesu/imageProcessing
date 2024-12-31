import cv2
import numpy as np
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt

class MorphoProcessFilters:

    @staticmethod
    def apply_dilation(image, kernel_size, iterations):
        kernel = np.ones((kernel_size, kernel_size), dtype=np.uint8)
        return cv2.dilate(image, kernel, iterations=int(iterations))

    @staticmethod
    def apply_erosion(image, kernel_size, iterations):
        kernel = np.ones((kernel_size, kernel_size), dtype=np.uint8)
        return cv2.erode(image, kernel, iterations=iterations)

    @staticmethod
    def apply_opening(image, kernel_size, iterations):
        kernel = np.ones((kernel_size, kernel_size), dtype=np.uint8)
        return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel, iterations=iterations)

    @staticmethod
    def apply_closing(image, kernel_size, iterations):
        kernel = np.ones((kernel_size, kernel_size), dtype=np.uint8)
        return cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel, iterations=iterations)

    @staticmethod
    def apply_skeletonization(image, kernel_size):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

        size = np.size(binary)
        skel = np.zeros(binary.shape, np.uint8)
        kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (kernel_size, kernel_size))

        while True:
            eroded = cv2.erode(binary, kernel)
            temp = cv2.dilate(eroded, kernel)
            temp = cv2.subtract(binary, temp)
            skel = cv2.bitwise_or(skel, temp)
            binary = eroded.copy()

            zeros = size - cv2.countNonZero(binary)
            if zeros == size:
                break

        return skel

    @staticmethod
    def apply_hit_or_miss(image, matrix):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        kernel = np.array(matrix, np.uint8)
        _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

        eroded = cv2.erode(binary, kernel)
        inverce_kernel = cv2.bitwise_not(kernel)
        dilated = cv2.dilate(binary, inverce_kernel)

        return cv2.bitwise_and(eroded, dilated)

