import tensorflow as tf
import os
from global_paths import VIOLATIONS

#### Constants ####
IMAGE_SIZE_LIMIT = 224
MODEL = tf.keras.models.load_model('my_model.h5')
TARGET_NAMES = ["No Violation"] + VIOLATIONS

def preprocess_image(path):
    """
    Load and preprocess the image.
    """
    supported_formats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
    if not any(path.lower().endswith(ext) for ext in supported_formats):
        raise ValueError(f"Unsupported image format for file: {path}")

    try:
        image = tf.io.read_file(path)
        image = tf.image.decode_image(image, channels=3)
    except Exception as e:
        print(f"Error reading or decoding image {path}: {e}")
        raise

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
    confidence = prediction.max() * 100

    return pred_class, confidence

def test_all_images_in_folder(folder_path):
    """
    Test all images in the specified folder using the loaded model.
    """
    img_files = sorted(os.listdir(folder_path), key=lambda x: int(''.join(filter(str.isdigit, x))))
    for img_file in img_files:
        img_path = os.path.join(folder_path, img_file)
        if os.path.isfile(img_path):
            prediction, confidence = test_img(img_path)
            print(f"{img_file}: {prediction}: {confidence:.2f}%")

# Example usage
test_all_images_in_folder('test_set') 

# These dont work for some reason
# test_img('tmp/TestImage8.bmp')
# test_img('tmp/TestImage54.jpeg')