import os
from data_process import prepare_data
import make_model
import pickle
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, classification_report, precision_score, recall_score, roc_auc_score, roc_curve
import tensorflow as tf
import numpy as np
import global_paths as g

## variables ##
epochs = 5
batch_size = 64
###############

x_train, x_test, y_train, y_test = prepare_data()

model = make_model.build_xception_model()
if os.path.exists('my_model.keras'):
    model.load_weights('my_model.keras')
model.summary()

# Train the model
history = model.fit(
    x_train, y_train, 
    epochs=epochs, 
    batch_size=batch_size, 
    validation_data=(x_test, y_test)
)

if os.path.exists('history.pkl'):
    saved_his = pickle.load(open('history.pkl', 'rb'))
    for key in history.history.keys():
        saved_his[key].extend(history.history[key])
    history.history = saved_his

# Save the history & model
with open('history.pkl', 'wb') as f:
    pickle.dump(history.history, f)
model.save('my_model.keras')

# Evaluate the model
y_pred = model.predict(x_test)
y_pred_classes = y_pred.argmax(axis=1)  # Convert probabilities to class labels

####### Evaluation Math #######
# Classification Report
print("\nClassification Report:")
print(classification_report(y_test.argmax(axis=1), y_pred_classes, target_names=list(g.VIOLATIONS.keys())))

# Accuracy
accuracy = accuracy_score(y_test.argmax(axis=1), y_pred_classes)
print(f'Accuracy: {accuracy}')

# Precision
precision = precision_score(y_test.argmax(axis=1), y_pred_classes, average='weighted')
print(f'Precision: {precision}')

# Recall
recall = recall_score(y_test.argmax(axis=1), y_pred_classes, average='weighted')
print(f'Recall: {recall}')

# AUC
auc = roc_auc_score(y_test, y_pred, multi_class='ovr')
print(f'AUC: {auc}')

####### Plotting #######

# Create subplots
fig, axs = plt.subplots(1, 3, figsize=(20, 5))

# ROC curve
fpr, tpr, _ = roc_curve(y_test.ravel(), y_pred.ravel())
axs[0].plot(fpr, tpr, label='ROC curve (area = %0.2f)' % auc)
axs[0].plot([0, 1], [0, 1], 'k--')
axs[0].set_xlim([0.0, 1.0])
axs[0].set_ylim([0.0, 1.05])
axs[0].set_xlabel('False Positive Rate')
axs[0].set_ylabel('True Positive Rate')
axs[0].set_title('Receiver Operating Characteristic')
axs[0].legend(loc="lower right")

# Loss
loss = history.history['loss']
val_loss = history.history['val_loss']
axs[1].plot(loss, label='Training Loss')
axs[1].plot(val_loss, label='Validation Loss')
axs[1].set_title('Loss')
axs[1].set_xlabel('Epochs')
axs[1].set_ylabel('Loss')
axs[1].legend()

# Learning curve
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
axs[2].plot(acc, label='Training Accuracy')
axs[2].plot(val_acc, label='Validation Accuracy')
axs[2].set_title('Learning Curve')
axs[2].set_xlabel('Epochs')
axs[2].set_ylabel('Accuracy')
axs[2].legend()

plt.tight_layout()
plt.show()