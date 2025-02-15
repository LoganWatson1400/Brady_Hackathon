import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import global_paths as g
import tensorflow as tf

## paths ##
DATA_PATH = g.DATA
PURPOSE = "Labeling"
EVERY_NTH = 5

for title in os.listdir(DATA_PATH):
    title_path = os.path.join(DATA_PATH, title)
    if not os.path.isdir(title_path):
        continue

    for phase in ['Before', 'After']:
        phase_dir = os.path.join(title_path, phase)
        if not os.path.exists(phase_dir):
            continue

        for i, img_file in enumerate(os.listdir(phase_dir)):
            if i % EVERY_NTH != 0:
                continue
            img_path = os.path.join(phase_dir, img_file)
            img = mpimg.imread(img_path)
            height, width, _ = img.shape
            plt.figure(figsize=(width / 100, height / 100))  # Adjust the figure size based on image dimensions
            plt.imshow(img)
            plt.title(f"Class: {title} - Purpose: {phase} {PURPOSE}")
            plt.show()

