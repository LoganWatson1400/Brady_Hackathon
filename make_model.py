import tensorflow as tf
from keras.models import Sequential
from keras.layers import GlobalAveragePooling2D, Dense, Dropout
from keras.applications import Xception
from keras.optimizers import Adam
from data_process import prepare_data

# testing
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt

# Load dataset
x_train, x_test, y_train, y_test = prepare_data()

# Define the Xception-based CNN Model
def build_xception_model():
    base_model = Xception(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False  # Freeze base 

    model = Sequential([
        base_model,
        GlobalAveragePooling2D(),
        Dense(128, activation='relu'),
        Dropout(0.5),  # Reduce overfit
        Dense(7, activation='softmax')
    ])

    model.compile(optimizer=Adam(learning_rate=0.0001), loss="categorical_crossentropy", metrics=["accuracy"])

    return model