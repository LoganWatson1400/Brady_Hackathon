import os
from data_process import prepare_data

import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import global_paths as g
import tensorflow as tf

## paths ##

x_train, y_train, x_test, y_test = prepare_data()

print(f"Training data shape: {x_train.shape}")
print(f"Training labels shape: {y_train.shape}")
print(f"Testing data shape: {x_test.shape}")
print(f"Testing labels shape: {y_test.shape}")

# Display an image from x_train
def display_image(image):
    plt.imshow(image)
    plt.axis('off')
    plt.show()

# Display the first image in the training set
display_image(x_train[0])

print("stop")