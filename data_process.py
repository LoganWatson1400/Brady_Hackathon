import os
import tensorflow as tf
import global_paths as g

## paths ##
DATA_PATH = g.DATA
## constants ##

# Parameters
allowed_formats = ('.bmp', '.gif', '.jpeg', '.jpg', '.png')

# Load images manually
def load_images(dir):
    image_paths = []
    labels = []
    for phase in ['Before', 'After']:
        phase_dir = os.path.join(dir, phase)
        if not os.path.exists(phase_dir):
            continue
        for img_file in os.listdir(phase_dir):
            if img_file.lower().endswith(allowed_formats):
                img_path = os.path.join(phase_dir, img_file)
                image_paths.append(img_path)
                labels.append(phase)
    return image_paths, labels

# Process all folders under the data directory
def prepare_data():
    image_paths, labels = [], []
    for title in os.listdir(DATA_PATH):
        title_path = os.path.join(DATA_PATH, title)
        if not os.path.isdir(title_path):
            continue

        print(f"Processing title: {title}")
        paths, lbls = load_images(title_path)
        image_paths.extend(paths)
        labels.extend(lbls)

    return image_paths, labels