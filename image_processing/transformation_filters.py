import cv2
import numpy as np
import pywt
from django.views.decorators.csrf import csrf_exempt
from numpy.ma.core import filled


@csrf_exempt

class TransformationFilters:
    @staticmethod
    def apply_rotation(image, angle):
        h, w = image.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        return cv2.warpAffine(image, M, (w, h))

    @staticmethod
    def apply_scaling(image, scaleX, scaleY):
        return cv2.resize(image, None, fx=scaleX, fy=scaleY, interpolation=cv2.INTER_LINEAR)

    @staticmethod
    def apply_translation(image, x, y):
        matrix = np.float32([[1, 0, x], [0, 1, y]])
        return cv2.warpAffine(image, matrix, (image.shape[1], image.shape[0]))

    @staticmethod
    def apply_fourier_transform(img, spec):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        f = np.fft.fft2(gray)
        fshift = np.fft.fftshift(f)
        magnitude_spectrum = spec * np.log(np.abs(fshift))
        return magnitude_spectrum

    @staticmethod
    def apply_wavelets_transform(img):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        cA, (cH, cV, cD) = pywt.dwt2(gray, 'haar')

        def normalize_wavelet_band(band):
            band_abs = np.abs(band)
            max_val = band_abs.max()
            if max_val == 0:
                return np.uint8(band_abs)
            band_norm = band_abs / max_val
            return np.uint8(band_norm * 255)

        cA_8u = normalize_wavelet_band(cA)
        cH_8u = normalize_wavelet_band(cH)
        cV_8u = normalize_wavelet_band(cV)
        cD_8u = normalize_wavelet_band(cD)

        top = np.hstack((cA_8u, cH_8u))
        bottom = np.hstack((cV_8u, cD_8u))
        combined = np.vstack((top, bottom))

        return combined
