import os
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, classification_report, precision_score, recall_score, roc_auc_score, roc_curve, f1_score
import tensorflow as tf
from global_paths import VIOLATIONS

def load_model(model_path):
    if os.path.exists(model_path):
        return tf.keras.models.load_model(model_path)
    else:
        raise FileNotFoundError(f"Model file '{model_path}' not found.")

def evaluate_model(model, x_test, y_test):
    y_test_labels = y_test.argmax(axis=1)
    y_pred = model.predict(x_test)
    y_pred_classes = y_pred.argmax(axis=1)  # Convert probabilities to class labels
    target_names = ["No Violation"] + VIOLATIONS

    # Debug: Check the distribution of classes in the test set
    unique_test_classes, test_class_counts = np.unique(y_test_labels, return_counts=True)
    print(f"Unique classes in y_test: {unique_test_classes}")
    print(f"Class distribution in y_test: {dict(zip(unique_test_classes, test_class_counts))}")

    labels = list(range(len(VIOLATIONS)+1))  # Ensure labels match the number of classes
    print("\nClassification Report:")
    print(classification_report(y_test_labels, y_pred_classes, target_names=target_names, labels=labels, zero_division=1))

    accuracy = accuracy_score(y_test_labels, y_pred_classes)
    print(f'Accuracy: {accuracy}')

    precision = precision_score(y_test_labels, y_pred_classes, average='weighted', zero_division=1)
    print(f'Precision: {precision}')

    recall = recall_score(y_test_labels, y_pred_classes, average='weighted', zero_division=1)
    print(f'Recall: {recall}')

    f1 = f1_score(y_test_labels, y_pred_classes, average='weighted', zero_division=1)
    print(f'F1 Score: {f1}')

    if len(np.unique(y_test_labels)) > 1:
        auc = roc_auc_score(y_test, y_pred, multi_class='ovr')
    else:
        auc = float('nan')
        print("AUC: Not defined (only one class present in y_true)")
    print(f'AUC: {auc}')

    return y_pred, accuracy, precision, recall, f1

def plot_metrics(history, y_test, y_pred):
    fig, axs = plt.subplots(1, 3, figsize=(20, 5))

    if len(np.unique(y_test.argmax(axis=1))) > 1:
        auc = roc_auc_score(y_test, y_pred, multi_class='ovr')
        fpr, tpr, _ = roc_curve(y_test.ravel(), y_pred.ravel())
        axs[0].plot(fpr, tpr, label='ROC curve (area = %0.2f)' % auc)
        axs[0].plot([0, 1], [0, 1], 'k--')
        axs[0].set_xlim([0.0, 1.0])
        axs[0].set_ylim([0.0, 1.05])
        axs[0].set_xlabel('False Positive Rate')
        axs[0].set_ylabel('True Positive Rate')
        axs[0].set_title('Receiver Operating Characteristic')
        axs[0].legend(loc="lower right")
    else:
        axs[0].text(0.5, 0.5, 'AUC not defined', horizontalalignment='center', verticalalignment='center')
        axs[0].set_title('Receiver Operating Characteristic')

    loss = history['loss']
    val_loss = history['val_loss']
    axs[1].plot(loss, label='Training Loss')
    axs[1].plot(val_loss, label='Validation Loss')
    axs[1].set_title('Loss')
    axs[1].set_xlabel('Epochs')
    axs[1].set_ylabel('Loss')
    axs[1].legend()

    acc = history['accuracy']
    val_acc = history['val_accuracy']
    axs[2].plot(acc, label='Training Accuracy')
    axs[2].plot(val_acc, label='Validation Accuracy')
    axs[2].set_title('Learning Curve')
    axs[2].set_xlabel('Epochs')
    axs[2].set_ylabel('Accuracy')
    axs[2].legend()

    plt.tight_layout()
    plt.show()