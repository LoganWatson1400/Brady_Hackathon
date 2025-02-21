import tensorflow as tf
from data_process import prepare_data
import matplotlib.pyplot as plt

### Parameters ###
lr = 0.0001
dropout = 0.5
##################

# Load dataset
x_train, x_test, y_train, y_test = prepare_data()

# Define augmentation layers
data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.2),
    tf.keras.layers.RandomZoom(0.2),
    tf.keras.layers.RandomTranslation(0.1, 0.1),
    tf.keras.layers.RandomCrop(224, 224),
    tf.keras.layers.RandomHeight(0.2),
    tf.keras.layers.RandomWidth(0.2),
])

# Function to visualize augmented images
def visualize_augmentation(data_augmentation, x_train):
    plt.figure(figsize=(10, 10))
    for i in range(9):
        augmented_image = data_augmentation(tf.expand_dims(x_train[i], 0))
        # augmented_image = tf.clip_by_value(augmented_image, 0, 1)  # Ensure values are in [0, 1] range
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(tf.squeeze(augmented_image).numpy())
        plt.axis("off")
    plt.show()

# Visualize the augmented images
# visualize_augmentation(data_augmentation, x_train)

# Define the Xception-based CNN Model
def build_xception_model():
    base_model = tf.keras.applications.Xception(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False  # Freeze base 

    model = tf.keras.models.Sequential([
        tf.keras.layers.InputLayer(input_shape=(224, 224, 3)),
        data_augmentation,  # Augmentations happen inside the model
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(dropout),  # Reduce overfit
        tf.keras.layers.Dense(7, activation='softmax')
    ])

    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=lr), loss="categorical_crossentropy", metrics=["accuracy"])

    return model