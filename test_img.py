import os
import tensorflow as tf
from global_paths import VIOLATIONS

import logging
logging.getLogger('tensorflow').disabled = True


#### Constants ####
IMAGE_SIZE_LIMIT = 224
MODEL = tf.keras.models.load_model('my_model.keras')
TARGET_NAMES = ["No Violation"] + VIOLATIONS

def preprocess_image(path):
    """
    Load and preprocess the image.
    """
    image = tf.io.read_file(path)
    image = tf.image.decode_image(image, channels=3)
    image = tf.image.resize(image, [IMAGE_SIZE_LIMIT, IMAGE_SIZE_LIMIT])
    image = image / 255.0  # Normalize to [0, 1]
    return image.numpy()

def test_img(img_path):
    """
    Test the image using the loaded model.
    """
    image = preprocess_image(img_path)
    image = image.reshape(1, IMAGE_SIZE_LIMIT, IMAGE_SIZE_LIMIT, 3)
    prediction = MODEL.predict(image)
    pred_class = prediction.argmax(axis=1)
    pred_class = TARGET_NAMES[pred_class[0]]

    return pred_class


# test_img = test_img('data\\ANSI A13.1 (Pipe Marking)\\Before\\Screenshot 2025-01-27 091628.png')
# print(test_img)