
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
import { decodeJpeg, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from "expo-asset";

let model: tf.LayersModel | null = null;

// List of asset files for model weights (use correct relative paths)
const weightFiles = [
  require("../assets/tfjs_model/group1-shard1of21.bin"),
  require("../assets/tfjs_model/group1-shard2of21.bin"),
  require("../assets/tfjs_model/group1-shard3of21.bin"),
  require("../assets/tfjs_model/group1-shard4of21.bin"),
  require("../assets/tfjs_model/group1-shard5of21.bin"),
  require("../assets/tfjs_model/group1-shard6of21.bin"),
  require("../assets/tfjs_model/group1-shard7of21.bin"),
  require("../assets/tfjs_model/group1-shard8of21.bin"),
  require("../assets/tfjs_model/group1-shard9of21.bin"),
  require("../assets/tfjs_model/group1-shard10of21.bin"),
  require("../assets/tfjs_model/group1-shard11of21.bin"),
  require("../assets/tfjs_model/group1-shard12of21.bin"),
  require("../assets/tfjs_model/group1-shard13of21.bin"),
  require("../assets/tfjs_model/group1-shard14of21.bin"),
  require("../assets/tfjs_model/group1-shard15of21.bin"),
  require("../assets/tfjs_model/group1-shard16of21.bin"),
  require("../assets/tfjs_model/group1-shard17of21.bin"),
  require("../assets/tfjs_model/group1-shard18of21.bin"),
  require("../assets/tfjs_model/group1-shard19of21.bin"),
  require("../assets/tfjs_model/group1-shard20of21.bin"),
  require("../assets/tfjs_model/group1-shard21of21.bin"),
];

// Load weight files as Uint8Array using Expo's Asset API
const loadWeightFiles = async () => {
  const weightFilesArray = await Promise.all(
    weightFiles.map(async (weightFile) => {
      const asset = Asset.fromModule(weightFile); // Use Asset fromModule
      await asset.downloadAsync(); // Ensure the asset is available locally
      const response = await fetch(asset.localUri!); // Fetch the local asset URI
      const buffer = await response.arrayBuffer(); // Read as ArrayBuffer
      const uint8Array = new Uint8Array(buffer); // Convert to Uint8Array
      return Array.from(uint8Array); // Convert to number[]
    })
  );
  return weightFilesArray;
};

// Load model from assets and weight files
export const loadModel = async () => {
  await tf.ready();
  if (!model) {
    try {
      const weights = await loadWeightFiles(); // Get the weight files as number[]
      const flattenedWeights = weights.flat(); // Flatten the weights into a single array

      // Load model using the weight files
      model = await tf.loadLayersModel(
        bundleResourceIO(
          require("../assets/tfjs_model/model.json"), // Model JSON path
          flattenedWeights // Flattened weight files as number[]
        )
      );
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model:", error);
    }
  }
};

// Predict from an image URI
export const predictFromImage = async (imageUri: string): Promise<number[]> => {
  if (!model) {
    console.warn("Model not loaded. Loading now...");
    await loadModel();
  }

  try {
    const imageTensor = await imageToTensor(imageUri);
    const outputTensor = model!.predict(imageTensor) as tf.Tensor;
    const outputArray = await outputTensor.data();

    // Dispose tensors to free memory
    imageTensor.dispose();
    outputTensor.dispose();

    return Array.from(outputArray);
  } catch (error) {
    console.error("Error during prediction:", error);
    return [];
  }
};

// Convert image to Tensor (React Native Compatible)
const imageToTensor = async (imageUri: string) => {
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }], // Resize image
    { format: ImageManipulator.SaveFormat.JPEG }
  );

  const response = await fetch(manipulatedImage.uri);
  const imageDataArrayBuffer = await response.arrayBuffer();
  
  // Decode image into Tensor
  const imageTensor = decodeJpeg(new Uint8Array(imageDataArrayBuffer))
    .toFloat()
    .div(255.0)
    .expandDims(0);

  return imageTensor;
};

