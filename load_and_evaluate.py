import os
import pickle
import tensorflow as tf
from evaluate import evaluate_model, plot_metrics
from data_process import prepare_data

def load_model_and_history(model_path, history_path):
    if os.path.exists(model_path):
        model = tf.keras.models.load_model(model_path)
    else:
        raise FileNotFoundError(f"Model file '{model_path}' not found.")
    
    if os.path.exists(history_path):
        with open(history_path, 'rb') as f:
            history = pickle.load(f)
    else:
        raise FileNotFoundError(f"History file '{history_path}' not found.")
    
    return model, history


_, x_test, _, y_test = prepare_data()
model_path = 'my_model.keras'
history_path = 'history.pkl'

model, history = load_model_and_history(model_path, history_path)

# Evaluate the model
y_pred, accuracy, precision, recall, f1 = evaluate_model(model, x_test, y_test)

# Plot metrics
plot_metrics(history, y_test, y_pred)

