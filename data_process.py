import os
import tensorflow as tf
import global_paths as g
from sklearn.model_selection import train_test_split
import numpy as np
import data_augment

## Constants ##
DATA_PATH = g.DATA
VIOLATIONS = g.VIOLATIONS
FORMATS = ('.bmp', '.gif', '.jpeg', '.jpg', '.png')
IMAGE_SIZE_LIMIT = 224  # This can be tweaked
AUGS = 0  # Number of augmented copies to create for each image

def load_images(dir, title_index):
    """
    Load image paths and labels from the specified directory.
    """
    image_paths = []
    labels = []
    for x in ['Before', 'After']:
        x_dir = os.path.join(dir, x)
        if not os.path.exists(x_dir):
            continue
        for img_file in os.listdir(x_dir):
            if img_file.lower().endswith(FORMATS):
                img_path = os.path.join(x_dir, img_file)
                image_paths.append(img_path)
                label = [0] * 7
                if x == 'After':
                    label[0] = 1  # No violation for "After" images
                else:
                    label[title_index] = 1  # One-hot encode the title
                labels.append(label)
    return image_paths, labels

def preprocess_image(path):
    """
    Load and preprocess the image.
    """
    image = tf.io.read_file(path)
    image = tf.image.decode_image(image, channels=3)
    image = tf.image.resize(image, [IMAGE_SIZE_LIMIT, IMAGE_SIZE_LIMIT])
    image = image / 255.0  # Normalize to [0, 1]
    return image.numpy()

def prepare_data():
    """
    Process all folders under the data directory and prepare the dataset.
    """
    data_paths, targets = [], []
    for i, title in enumerate(VIOLATIONS):
        title_path = os.path.join(DATA_PATH, title)
        paths, lbls = load_images(title_path, i+1)
        data_paths.extend(paths)
        targets.extend(lbls)

    # Load and preprocess images
    data, new_targets = [], []
    for path, target in zip(data_paths, targets):
        image = preprocess_image(path)
        data.append(image)
        new_targets.append(target)
        # Augment the data
        for _ in range(AUGS):
            augmented_image = data_augment.augment_image(image)
            augmented_image = tf.image.resize(augmented_image, [IMAGE_SIZE_LIMIT, IMAGE_SIZE_LIMIT]).numpy()
            data.append(augmented_image)
            new_targets.append(target)

    data = np.array(data)
    targets = np.array(new_targets)

    # Shuffle data
    indices = np.arange(len(data))
    np.random.shuffle(indices)
    data, targets = data[indices], targets[indices]

    # Split data into training and validation sets
    return train_test_split(data, targets, test_size=0.2, random_state=42)
