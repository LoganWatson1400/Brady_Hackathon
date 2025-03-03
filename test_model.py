import tensorflow as tf
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix
from data_process import prepare_data
from global_paths import VIOLATIONS

MODEL_PATH = 'my_model.h5'
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
y_pred = y_pred_probs.argmax(axis=1)  # Convert probabilities to class labels

# Classification Report
# print("\nClassification Report:")
target_names = ["No Violation"] + VIOLATIONS
# print(classification_report(y_test.argmax(axis=1), y_pred, target_names=target_names))

def visualize_prediction(index):
    plt.imshow(x_test[index])
    plt.axis("off")
    pred_label = f"Pred: {target_names[y_pred[index]]}"
    pred_prob = f"Prob: {y_pred_probs[index].max() * 100:.2f}%"
    actual_label = f"Actual: {target_names[y_test[index].argmax()]}"
    plt.title(f"{actual_label}\n{pred_label}\n{pred_prob}")
    
    # Add a green box if prediction matches actual, red otherwise
    color = 'green' if y_pred[index] == y_test[index].argmax() else 'red'
    plt.gca().add_patch(plt.Rectangle((0, 0), plt.gca().get_xlim()[1], plt.gca().get_ylim()[0], 
                                      linewidth=4, edgecolor=color, facecolor='none'))
    plt.subplots_adjust(top=0.8)  # Adjust the top to make space for the title
    plt.show()

# Show couple of sample predictions
for i in range(20):  
    visualize_prediction(i)


