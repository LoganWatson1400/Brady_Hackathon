import tensorflow as tf 
##### variables #####
lr = 0.0001
dropout = 0.5
####################
# Define the Xception-based CNN Model
def build_xception_model():
    base_model = tf.keras.applications.Xception(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False  # Freeze base 

    model = tf.keras.models.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(dropout),  # Reduce overfit
        tf.keras.layers.Dense(1, activation='sigmoid')  
    ])

    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=lr), loss="binary_crossentropy", metrics=["accuracy"])

    return model
