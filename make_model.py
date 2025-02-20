import tensorflow as tf
from data_process import prepare_data

### Parameters ###
lr = 0.0001
dropout = 0.5
##################


# Load dataset
x_train, x_test, y_train, y_test = prepare_data()

# Define the Xception-based CNN Model
def build_xception_model():
    base_model = tf.keras.applications.Xception(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False  # Freeze base 

    model = tf.keras.models.Sequential([
        base_model,
        tf.keras.laysers.GlobalAveragePooling2D(),
        tf.keras.laysers.Dense(128, activation='relu'),
        tf.keras.laysers.Dropout(dropout),  # Reduce overfit
        tf.keras.laysers.Dense(7, activation='softmax')
    ])

    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=lr), loss="categorical_crossentropy", metrics=["accuracy"])

    return model