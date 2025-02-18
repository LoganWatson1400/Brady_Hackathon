import os
import pickle
from data_process import prepare_data
import make_model
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score, roc_curve, f1_score
# import seaborn as sns

## variables ##
epochs = 10
batch_size = 32

x_train, x_test, y_train, y_test = prepare_data()
model = make_model.make_model() # TODO change the method name to match the actual method name
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