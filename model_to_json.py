# import tensorflow as tf
from tensorflow import keras

model = keras.models.load_model('my_model.keras')
model_json = model.to_json()
with open('model.json', 'w') as f:
    f.write(model_json)