import os
from data_process import prepare_data
from evaluate import evaluate_model, plot_metrics
import make_model
import pickle
import matplotlib.pyplot as plt
import tensorflow as tf
import global_paths as g

## variables ##
violations = g.VIOLATIONS
epochs = 10000
batch_size = 64
patience = 10
###############

x_train, x_test, y_train, y_test = prepare_data()

# Ensure x_train and y_train have the same number of samples
assert len(x_train) == len(y_train), "Mismatch in number of samples between x_train and y_train"
assert len(x_test) == len(y_test), "Mismatch in number of samples between x_test and y_test"

model_path = 'my_model.h5'
if os.path.exists(model_path):
    model = tf.keras.models.load_model(model_path)
else:
    model = make_model.build_xception_model()
model.summary()

# Add EarlyStopping and CustomSaver callbacks
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss', 
    patience=patience, 
    restore_best_weights=True
)

# Train the model
history = model.fit(
    x_train, y_train, 
    epochs=epochs, 
    batch_size=batch_size, 
    validation_data=(x_test, y_test),
    callbacks=[early_stopping],
    verbose=1  # Set verbosity to 1 for progress bar
)

if os.path.exists('history.pkl'):
    saved_his = pickle.load(open('history.pkl', 'rb'))
    for key in history.history.keys():
        saved_his[key].extend(history.history[key])
    history.history = saved_his

# Save the history & model
with open('history.pkl', 'wb') as f:
    pickle.dump(history.history, f)
model.save('my_model.h5')

# Evaluate the model
y_pred, accuracy, precision, recall, f1 = evaluate_model(model, x_test, y_test)

# Plot metrics
plot_metrics(history.history, y_test, y_pred)