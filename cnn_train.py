import os
from data_process import prepare_data
from evaluate import evaluate_model, plot_metrics
import make_model
import pickle
import tensorflow as tf
from global_paths import MODEL_PATH, HISTORY_PATH, MODEL_BACKUP_PATH, HISTORY_BACKUP_PATH

## variables ##
epochs = 2
batch_size = 16
patience = 5
###############

x_train, x_test, y_train, y_test = prepare_data()

if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)
else:
    model = make_model.build_xception_model()
model.summary()

class CustomSaver(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        if (epoch + 1) % 10 == 0:
            self.model.save(MODEL_BACKUP_PATH, overwrite=True)
            with open(HISTORY_BACKUP_PATH, 'wb') as f:
                pickle.dump(self.model.history.history, f)

# Add EarlyStopping and CustomSaver callbacks
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss', 
    patience=patience, 
    restore_best_weights=True
)
custom_saver = CustomSaver()

# Train the model
history = model.fit(
    x_train, y_train, 
    epochs=epochs, 
    batch_size=batch_size, 
    validation_data=(x_test, y_test),
    callbacks=[early_stopping, custom_saver]
)

if os.path.exists(HISTORY_PATH):
    saved_his = pickle.load(open(HISTORY_PATH, 'rb'))
    for key in history.history.keys():
        saved_his[key].extend(history.history[key])
    history.history = saved_his

# Save the history & model
with open(HISTORY_PATH, 'wb') as f:
    pickle.dump(history.history, f)
model.save(MODEL_PATH)

# Evaluate the model
y_pred, accuracy, precision, recall, f1 = evaluate_model(model, x_test, y_test)

# Plot metrics
plot_metrics(history.history, y_test, y_pred)