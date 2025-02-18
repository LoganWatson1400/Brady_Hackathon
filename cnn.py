import os
import pickle
from data_process import prepare_data
import make_model
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score, roc_curve, f1_score
# import seaborn as sns

## variables ##
epochs = 1
batch_size = 32
###############

x_train, x_test, y_train, y_test = prepare_data()
if os.path.exists('model.h5'):# TODO change the method name to match the actual method name
    model = make_model.make_model()
    model.load_weights('model.h5')
else:
    model = make_model.make_model() 
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
model.save('model.h5')

# Evaluate the model
y_pred = model.predict(x_test)
y_pred_classes = np.argmax(y_pred, axis=1)

# Accuracy
accuracy = accuracy_score(y_test, y_pred_classes)
print(f'Accuracy: {accuracy}')

# Precision
precision = precision_score(y_test, y_pred_classes)
print(f'Precision: {precision}')

# Recall
recall = recall_score(y_test, y_pred_classes)
print(f'Recall: {recall}')

# AUC
auc = roc_auc_score(y_test, y_pred)
print(f'AUC: {auc}')

# Create subplots
fig, axs = plt.subplots(1, 3, figsize=(20, 5))

# ROC curve
fpr, tpr, _ = roc_curve(y_test, y_pred)
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