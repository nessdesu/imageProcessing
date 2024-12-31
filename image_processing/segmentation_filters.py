from sys import flags

import cv2
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from numpy.ma.core import filled


@csrf_exempt

class SegmentationFilters:
    @staticmethod
    def apply_otsu(image, first_value, second_value):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        return cv2.threshold(blurred, first_value, second_value, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    @staticmethod
    def apply_adaptive_threshold(image, blockSize, c, color):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        mean_threshold = cv2.adaptiveThreshold(gray, color, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, blockSize, c)
        gaussian_threshold = cv2.adaptiveThreshold(gray, color, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, blockSize, c)
        return mean_threshold, gaussian_threshold

    @staticmethod
    def apply_canny_edge(image, threshold1, threshold2):
        gray = cv2.cvtColor(image, cv2.COLOR_BGRA2GRAY)
        return cv2.Canny(gray, threshold1=threshold1, threshold2=threshold2)

    @staticmethod
    def apply_watershed_segmentation(img, iteration):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        kernel = np.ones((5, 5), np.uint8)
        opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=iteration)
        findBackground = cv2.dilate(opening, kernel, iterations=iteration)
        frontView = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
        ret, frontView = cv2.threshold(frontView, 0.7 * frontView.max(), 255, 0)
        frontView = np.uint8(frontView)

        kernel = np.ones((3, 3), np.uint8)
        frontView_dilated = cv2.dilate(frontView, kernel, iterations=iteration)

        unknown = cv2.subtract(findBackground, frontView)
        ret, markers = cv2.connectedComponents(frontView_dilated)
        markers = markers + 1
        markers[unknown == 255] = 0
        markers = cv2.watershed(img, markers)
        img[markers == -1] = [0,255, 0]
        return img

    @staticmethod
    def apply_region_growing(image, seedx, seedy, lo_diff, up_diff):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        h , w = gray.shape[:2]
        mask = np.zeros((h+2, w+2), dtype=np.uint8)

        result = image.copy()

        flags = 4  # veya 8
        flags |= (255 << 8)
        flags |= cv2.FLOODFILL_FIXED_RANGE
        seed_point = (seedx, seedy)
        color_fill = (0, 255, 0)
        tripleLoDiff = (lo_diff,) * 3
        tripleUpDiff = (up_diff,) * 3
        cv2.floodFill(
            result,  # İşlenecek görüntü
            mask,  # Maske
            seedPoint=seed_point,
            newVal=color_fill,
            loDiff=tripleLoDiff,
            upDiff=tripleUpDiff,
            flags=flags
        )
        return result

