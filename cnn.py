import pickle
from cnn import prepare_data
import make_model

## variables ##
epochs = 10
batch_size = 32

x_train, y_train, x_test, y_test = prepare_data()
model = make_model.make_model() # TODO change the method name to match the actual method name
model.summary()

# what does fit return, it is a tnserflow model
history = model.fit(
    x_train, y_train, 
    epochs=epochs, 
    batch_size=batch_size, 
    validation_data=(x_test, y_test)
    )

# save the history
with open('history.pkl', 'wb') as f:
    pickle.dump(history.history, f)
model.save('model.h5')




# i want to evaluate the model with many different metrics including 
# confusion matrix, 
# accuracy, precision, recall, 
# AUC, ROC curve, 
# loss, and learning curve

