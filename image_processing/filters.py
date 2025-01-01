import cv2
import numpy as np
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt

class ImageFilters:
    @staticmethod
    def apply_threshold(image, threshold):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, thresholded = cv2.threshold(gray, threshold, 255, cv2.THRESH_BINARY)
        return thresholded

    @staticmethod
    def apply_average_filter(image, kernel_size):
        return cv2.blur(image, (kernel_size, kernel_size))

    @staticmethod
    def apply_gaussian_filter(image, matrix):
        if matrix is None:
            return cv2.GaussianBlur(image, (5, 5), 0)
        else:
            kernel = np.array(matrix, dtype=np.uint8)
            return cv2.filter2D(image, -1, kernel)

    @staticmethod
    def apply_histogram(image):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return cv2.equalizeHist(gray)


    @staticmethod
    def a_histogram_equalization(image, cliptLimit, tileGridSize):
        gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(cliptLimit, tileGridSize)
        return clahe.apply(gray)

    @staticmethod
    def apply_sobel(image, matrix):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        if matrix is None:
            sobelX = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
            sobelY = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)

        else:
            kernelX = np.array(matrix)
            kernelY = np.transpose(matrix)
            sobelX = cv2.filter2D(gray, cv2.CV_64F, kernelX)
            sobelY = cv2.filter2D(gray, cv2.CV_64F, kernelY)

        return cv2.magnitude(sobelX, sobelY)

    @staticmethod
    def apply_laplace(image, matrix):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        if matrix is None:
            laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        else:
            kernel = np.array(matrix)
            laplacian = cv2.filter2D(gray, cv2.CV_64F, kernel)
        return laplacian