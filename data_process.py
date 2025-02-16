import os
import tensorflow as tf
import global_paths as g
from sklearn.model_selection import train_test_split
import numpy as np

## paths ##
DATA_PATH = g.DATA
## constants ##

# Parameters
allowed_formats = ('.bmp', '.gif', '.jpeg', '.jpg', '.png')

# Load images manually
def load_images(dir):
    image_paths = []
    labels = []
    # Before = before violation fix
    # After = after violation fix
    for x in ['Before', 'After']:
        x_dir = os.path.join(dir, x)
        if not os.path.exists(x_dir):
            continue
        for img_file in os.listdir(x_dir):
            if img_file.lower().endswith(allowed_formats):
                img_path = os.path.join(x_dir, img_file)
                image_paths.append(img_path)
                labels.append(0 if x == 'Before' else 1)  # Convert labels to binary
    return image_paths, labels

# Load and preprocess images
def load_and_preprocess_image(path):
    image = tf.io.read_file(path)
    image = tf.image.decode_image(image, channels=3)
    image = tf.image.resize(image, [224, 224])  # Resize to a fixed size
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

    # Split data into training and validation sets
    train_data, val_data, train_targets, val_targets = train_test_split(data, targets, test_size=0.2, random_state=42)

    return train_data, val_data, train_targets, val_targets