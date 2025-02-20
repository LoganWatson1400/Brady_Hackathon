import os
import tensorflow as tf
import global_paths as g
from sklearn.model_selection import train_test_split
import numpy as np

## paths ##
DATA_PATH = g.DATA
## constants ##

# Parameters
violations = g.VIOLATIONS
allowed_formats = ('.bmp', '.gif', '.jpeg', '.jpg', '.png')
image_size_limit = 224 # this can be tweaked

# Load images manually
def load_images(dir):
    image_paths = []
    labels = []

    for violation in violations.keys():
        violation_dir = os.path.join(dir, violation)
        if not os.path.exists(violation_dir):
            continue
        for img_file in os.listdir(violation_dir):
            if img_file.lower().endswith(allowed_formats):
                img_path = os.path.join(violation_dir, img_file)
                image_paths.append(img_path)
                labels.append(violations[violation])
    return image_paths, labels

# Load and preprocess images
def load_and_preprocess_image(path):
    image = tf.io.read_file(path)
    image = tf.image.decode_image(image, channels=3)
    image = tf.image.resize(image, [image_size_limit, image_size_limit])  # Resize to a fixed size
    image = image / 255.0  # Normalize to [0, 1]
    return image

# Process all folders under the data directory
def prepare_data():
    data_paths = []
    targets = []
    for title in os.listdir(DATA_PATH):
        title_path = os.path.join(DATA_PATH, title)
        if not os.path.isdir(title_path):
            continue

        print(f"Processing title: {title}")
        paths, lbls = load_images(title_path)
        data_paths.extend(paths)
        targets.extend(lbls)

    # Load and preprocess images
    data = [load_and_preprocess_image(path) for path in data_paths]
    data = np.array(data)
    targets = np.array(targets)

    # Shuffle data
    indices = np.arange(len(data))
    np.random.shuffle(indices)
    data = data[indices]
    targets = targets[indices]

    # Convert targets to categorical
    targets = tf.keras.utils.to_categorical(targets, num_classes=7)

    # Split data into training and validation sets
    x_train, x_test, y_train, y_test = train_test_split(data, targets, test_size=0.2, random_state=42)

    return x_train, x_test, y_train, y_test


_, _, _, y_test = prepare_data()


print(f"Testing labels shape: {y_test.shape}")

print(y_test[0])
