
/*
import { loadPyodide , PyodideInterface} from "pyodide";
import { CameraCapturedPicture } from "expo-camera";

let pyodideInstance: PyodideInterface | null = null;

async function initPyodide() {
  if (!pyodideInstance) {
    pyodideInstance = await loadPyodide();
  }
}

const predictScript = `
#Add imports

#Add the python script for predicting
def predict(image):
    return prediction

`;

export default async function modelScript(image: CameraCapturedPicture) {
  await initPyodide();

  if(!pyodideInstance){ throw new Error("Pyodide not initialized yet");}

  await pyodideInstance.runPythonAsync(predictScript);

  const output = await pyodideInstance.runPythonAsync(`predict("${image}")`);

  return output;
}
*/

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

// Load the model once and reuse it
let model: tf.LayersModel | null = null;

export const loadModel = async () => {
  await tf.ready();
  if (!model) {
    try {
      model = await tf.loadLayersModel(require("./assets/model.json")); // Adjust path as needed
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model:", error);
    }
  }
};

export const predictFromImage = async (imageUri: string): Promise<number[]> => {
  if (!model) {
    console.warn("Model not loaded. Loading now...");
    await loadModel();
  }

  try {
    const imageTensor = await imageToTensor(imageUri);
    const outputTensor = model!.predict(imageTensor) as tf.Tensor;
    const outputArray = await outputTensor.data();

    // Dispose tensors to free up memory
    imageTensor.dispose();
    outputTensor.dispose();

    return Array.from(outputArray);
  } catch (error) {
    console.error("Error during prediction:", error);
    return [];
  }
};

// Convert image to Tensor
const imageToTensor = async (imageUri: string) => {
  const response = await fetch(imageUri);
  const imageData = await response.blob();
  const imageBitmap = await createImageBitmap(imageData);
  return tf.browser.fromPixels(imageBitmap).toFloat().div(255.0).expandDims(0);
};

