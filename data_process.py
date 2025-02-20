import os
import tensorflow as tf
import global_paths as g
from sklearn.model_selection import train_test_split
import numpy as np

## paths ##
DATA_PATH = g.DATA
## constants ##
VIOLATIONS = g.VIOLATIONS

# Parameters
allowed_formats = ('.bmp', '.gif', '.jpeg', '.jpg', '.png')
image_size_limit = 224 # this can be tweaked

# Load images manually
def get_paths(dir, title, title_index):
    image_paths = []
    labels = []
    for x in ['Before', 'After']:
        x_dir = os.path.join(dir, x)
        if not os.path.exists(x_dir):
            continue
        for img_file in os.listdir(x_dir):
            if img_file.lower().endswith(allowed_formats):
                img_path = os.path.join(x_dir, img_file)
                image_paths.append(img_path)
                label = [0] * 6  # One-hot encode the title
                label[title_index] = 1
                label.append(0 if x == 'Before' else 1)  # Add binary label for Before/After
                labels.append(label)
    return image_paths, labels

# Load and preprocess images
def pre_process(path):
    image = tf.io.read_file(path)
    image = tf.image.decode_image(image, channels=3)
    image = tf.image.resize(image, [image_size_limit, image_size_limit])  # Resize to a fixed size
    image = image / 255.0  # Normalize to [0, 1]
    return image

# Process all folders under the data directory
def prepare_data():
    data_paths = []
    targets = []
    titles = os.listdir(DATA_PATH)
    for title_index, title in enumerate(titles):
        title_path = os.path.join(DATA_PATH, title)
        if not os.path.isdir(title_path):
            continue

        print(f"Processing title: {title}")
        paths, lbls = get_paths(title_path, title, title_index)
        data_paths.extend(paths)
        targets.extend(lbls)

    # Load and preprocess images
    data = []
    for path, label in zip(data_paths, targets):
        image = pre_process(path)
        data.append(image.numpy())  # Convert Tensor to NumPy array
        # Augment the data

    data = np.array(data)
    targets = np.array(targets)

    # Shuffle data
    indices = np.arange(len(data))
    np.random.shuffle(indices)
    data = data[indices]
    targets = targets[indices]

    # Split data into training and validation sets
    x_train, x_test, y_train, y_test = train_test_split(data, targets, test_size=0.2, random_state=42)

    return x_train, x_test, y_train, y_test
