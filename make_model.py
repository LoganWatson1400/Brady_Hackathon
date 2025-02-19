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
        Dense(1, activation='sigmoid')  
    ])

    model.compile(optimizer=Adam(learning_rate=0.0001), loss="binary_crossentropy", metrics=["accuracy"])

    return model

model = build_xception_model()

# Train the model
history = model.fit(x_train, y_train, epochs=20, batch_size=32, validation_data=(x_test, y_test))

print("Input shape", model.input_shape)

# Save the trained model
model.save("model.keras", overwrite= True)

print("Model training completed! Saved as model.keras")

########### TESTING #####################################
# as unable to load model in model_evaluation.py

print(f"x_test shape: {x_test.shape}") # testing shape befor passing to model.eval

# Evaluate the model on test data
loss, accuracy = model.evaluate(x_test, y_test)
print(f"Test Accuracy: {accuracy:.2f}")
print("loss", loss)

# Predicting on test set
y_pred_probs = model.predict(x_test)
y_pred = (y_pred_probs > 0.5).astype("int32")

# Classification Report
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["Before (Non-Compliant)", "After (Compliant)"]))

