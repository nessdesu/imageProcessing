import cv2
import numpy as np
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt

class ColorImageFilters:
    @staticmethod
    def apply_rgb_to_hsv(image):
        return cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    @staticmethod
    def apply_hsv_to_rgb(image):
        return cv2.cvtColor(image, cv2.COLOR_HSV2BGR)

    @staticmethod
    def apply_rgb_to_cmky(image):

        r, g, b = image[:, :, 0], image[:, :, 1], image[:, :, 2]
        k = 1 - np.max(image, axis=2)
        c = (1 - r - k) / (1 - k)
        m = (1 - g - k) / (1 - k)
        y = (1 - b - k) / (1 - k)
        return np.dstack((c, m, y, k))

    @staticmethod
    def apply_low_pass_filter_in_frequency_area(image, kernel, maskSize):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        dft = cv2.dft(np.float32(gray), flags=cv2.DFT_COMPLEX_OUTPUT)
        dft_shift = np.fft.fftshift(dft)
        mask = np.zeros((gray.shape[0], gray.shape[1], 2), np.uint8)
        mask[gray.shape[0] // 2 - maskSize // 2:gray.shape[0] // 2 + maskSize // 2,
        gray.shape[1] // 2 - maskSize // 2:gray.shape[1] // 2 + maskSize // 2] = 1
        dft_shift = dft_shift * mask
        f_ishift = np.fft.ifftshift(dft_shift)
        img_back = cv2.idft(f_ishift)
        img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])
        img_back = cv2.normalize(img_back, None, 0, 255, cv2.NORM_MINMAX)
        img_back = np.uint8(img_back)
        return img_back

    @staticmethod
    def apply_high_pass_filter_in_frequency_area(image, maskSize):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        dft = cv2.dft(np.float32(gray), flags=cv2.DFT_COMPLEX_OUTPUT)
        dft_shift = np.fft.fftshift(dft)
        mask = np.ones((gray.shape[0], gray.shape[1], 2), np.uint8)
        mask[gray.shape[0] // 2 - maskSize // 2:gray.shape[0] // 2 + maskSize // 2,
        gray.shape[1] // 2 - maskSize // 2:gray.shape[1] // 2 + maskSize // 2] = 0
        dft_shift = dft_shift * mask
        f_ishift = np.fft.ifftshift(dft_shift)
        img_back = cv2.idft(f_ishift)
        img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])
        img_back = cv2.normalize(img_back, None, 0, 255, cv2.NORM_MINMAX)
        img_back = np.uint8(img_back)
        return img_back


    @staticmethod
    def apply_band_pass_filter(image, low, high):
        gray=cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        dft = cv2.dft(np.float32(gray), flags=cv2.DFT_COMPLEX_OUTPUT)
        dft_shift = np.fft.fftshift(dft)

        mask = np.zeros((gray.shape[0], gray.shape[1], 2), np.uint8)
        mask[gray.shape[0] // 2 - high // 2:gray.shape[0] // 2 + high // 2,
        gray.shape[1] // 2 - high // 2:gray.shape[1] // 2 + high // 2] = 1

        mask[gray.shape[0] // 2 - low // 2:gray.shape[0] // 2 + low // 2,
        gray.shape[1] // 2 - low // 2:gray.shape[1] // 2 + low // 2] = 0
        dft_shift = dft_shift * mask
        f_ishift = np.fft.ifftshift(dft_shift)
        img_back = cv2.idft(f_ishift)
        img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])
        img_back = cv2.normalize(img_back, None, 0, 255, cv2.NORM_MINMAX)
        img_back = np.uint8(img_back)
        return img_back



    @staticmethod
    def apply_band_stop_filter(image, low, high):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        dft = cv2.dft(np.float32(gray), flags=cv2.DFT_COMPLEX_OUTPUT)
        dft_shift = np.fft.fftshift(dft)

        rows, cols = gray.shape
        crow, ccol = rows // 2, cols // 2
        #tum frekansları geciren maske
        mask = np.ones((rows, cols, 2), np.uint8)

        #orta frekanslari sifirliyoruz
        cv2.circle(mask, (ccol, crow), high, 0, -1)
        cv2.circle(mask, (ccol, crow), low, 1, -1)

        dft_shift = dft_shift * mask
        f_ishift = np.fft.ifftshift(dft_shift)
        img_back = cv2.idft(f_ishift)
        img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])
        img_back = cv2.normalize(img_back, None, 0, 255, cv2.NORM_MINMAX)
        img_back = np.uint8(img_back)
        return img_back
