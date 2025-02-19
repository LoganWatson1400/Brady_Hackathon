import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix
from data_process import prepare_data
import global_paths as g

MODEL_PATH = g.MODEL

# Load the dataset
x_train, x_test, y_train, y_test = prepare_data()

print(f"x_train shape: {x_train.shape}, x_test shape: {x_test.shape}")  # Verify shape consistency
print(f"y_train shape: {y_train.shape}, y_test shape: {y_test.shape}")  # Verify shape consistency

# Load the trained model
model = tf.keras.models.load_model(MODEL_PATH)
print(model.summary())
print("Loaded model!")

# Evaluate the model on test data
loss, accuracy = model.evaluate(x_test, y_test)
print(f"Test Accuracy: {accuracy:.2f}")

# Predict on test set
y_pred_probs = model.predict(x_test)
y_pred = (y_pred_probs > 0.5).astype("int32")  # Convert probabilities to binary labels

# Classification Report
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["Before (Non-Compliant)", "After (Compliant)"]))

# Confusion Matrix
conf_matrix = confusion_matrix(y_test, y_pred)
print("\nConfusion Matrix:")
print(conf_matrix)

def visualize_prediction(index):
    plt.imshow(x_test[index])
    plt.axis("off")
    pred_label = "Compliant Pred" if y_pred[index] == 1 else "Non-Compliant Pred"
    actual_label = "Compliant" if y_test[index] == 1 else "Non-Compliant"
    plt.title(f"Actual: {actual_label}\nPredicted: {pred_label}")
    plt.show()

# Show couple of sample predictions
for i in range(3):  
    visualize_prediction(i)



