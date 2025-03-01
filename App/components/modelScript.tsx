
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

