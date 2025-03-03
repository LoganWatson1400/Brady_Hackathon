import os
import tensorflow as tf
import tensorflowjs as tfjs

model_path = 'my_model.h5'
if os.path.exists(model_path):
    print(f"Loading model from {model_path}")
    model = tf.keras.models.load_model(model_path)  # Specify compile=False for HDF5 format
else:
    print(f"Model not found at {model_path}")
    exit()

output_dir = 'tfjs_model'
if not os.path.exists(output_dir):
    print(f"Creating directory {output_dir}")
    os.makedirs(output_dir)
else:
    print(f"Directory {output_dir} already exists")

print(f"Saving model to {output_dir}")
tfjs.converters.save_keras_model(model, output_dir)
print("Model saved successfully")



