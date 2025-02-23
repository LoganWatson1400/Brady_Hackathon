import cv2
import numpy as np
import random

"""
This file is not used currently because the data augmentation is done in the model.py file.
as a layer in the model. This file is kept here for reference purposes.
"""

def rotate_image(image, angle):
    # Rotate the image by a given angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated_image = cv2.warpAffine(image, M, (w, h))
    return rotated_image

def offset_image(image, x_offset, y_offset):
    # Offset the image by given x and y offsets
    M = np.float32([[1, 0, x_offset], [0, 1, y_offset]])
    offset_image = cv2.warpAffine(image, M, (image.shape[1], image.shape[0]))
    return offset_image

def crop_image(image, crop_size):
    # Crop the image to the given size
    h, w = image.shape[:2]
    start_x = random.randint(0, w - crop_size[0])
    start_y = random.randint(0, h - crop_size[1])
    cropped_image = image[start_y:start_y + crop_size[1], start_x:start_x + crop_size[0]]
    return cropped_image

def adjust_color(image, alpha, beta):
    # Manually adjust the color of the image
    image = image * alpha + beta
    image = np.clip(image, 0, 1)  # Ensure the values are within [0, 1]
    return image

def augment_image(image):
    # Apply a series of augmentations to the image
    angle = random.uniform(-30, 30)
    x_offset = random.randint(-10, 10)
    y_offset = random.randint(-10, 10)
    crop_size = (random.randint(50, 100), random.randint(50, 100))
    alpha = random.uniform(0.2, 2.5)
    beta = random.uniform(-0.4, 0.4)
    
    image = rotate_image(image, angle)
    image = offset_image(image, x_offset, y_offset)
    image = crop_image(image, crop_size)
    image = adjust_color(image, alpha, beta)
    
    return image
