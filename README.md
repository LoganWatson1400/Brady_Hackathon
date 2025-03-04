
# Brady_Hackathon

## Description
The **Brady Hackathon Project** is a mobile application designed to help create a safer workplace for customers by spotting potential regulatory violations in images. The app leverages deep learning models to detect violations related to OSHA and ANSI regulations and provides real-time feedback to users. With a focus on improving workplace safety, this app aims to reduce accidents and ensure compliance with industry standards.

---

## CSI Hackathon Spring 2025
[Brady Corporation: AI for Workplace Safety Hackathon](https://uwm.edu/csi/workforce-innovation/csi-spring-2025-hackathon/)  
Hosted by the Connected Systems Institute, UW-Milwaukee

---

## Contributors
- Alex Jones
- Akash Reddy Jammula
- Gurleen Singh
- Logan Watson
- Patrick "Jack" Harmer
- Khatera Nazari

---

## Application Setup

### **Mobile App (Expo Go) Setup**

To run the app on your mobile device:

1. Install **Expo Go** on your phone (available in the App Store or Google Play Store).
2. Scan the provided **QR code** from the project using the Expo Go app.
3. The app will launch on your device, where you can interact with the features that detect regulatory violations in images.

We are using **npx tunnel** to ensure that the app works seamlessly, even if there are network security issues (due to UW-Milwaukee's firewall).

### **Local Web App Setup**

We also have a web version of the app available, which you can run locally without needing to download it onto your phone. This version runs on **localhost** and can be accessed directly via your browser.

To run the web app locally:

1. Clone the separate repository (not in this repo) where the code is stored.
2. Navigate to the project directory and run the following command:
   ```bash
   npm run dev
   ```
   This will start the app on **localhost:44458**.

3. Open **Google Chrome** (or another modern browser) and navigate to `http://localhost:44458` to access the app.
4. You can also copy-paste the code from the web app to your phone’s browser and interact with it directly.

> **Note**: The code for the local version is stored in a separate repository to keep things organized.

---

## New Violations Added

In addition to the original six violations related to OSHA and ANSI, we have added the following **three critical violations** that have resulted in significant fines for companies failing to observe them. These violations are particularly important for workplace safety:

1. **Fall Protection – General Requirements (1926.501)**  
   - **Description**: Fall protection is required in all situations where employees are exposed to falls of six feet or more.  
   - This regulation is crucial for preventing falls from elevated surfaces, a leading cause of workplace injuries and fatalities.

2. **Hazard Communication (1910.1200)**  
   - **Description**: Employers must inform workers about hazardous chemicals in their workplaces and provide proper training.  
   - Ensuring employees are aware of the chemicals they may encounter on the job is vital to preventing harmful exposure and accidents.

3. **Scaffolding (1926.451)**  
   - **Description**: Scaffolding must be properly erected, supported, and maintained to ensure worker safety.  
   - Scaffolding-related accidents can result in severe injuries, making compliance with safety standards essential for workplace safety.

These additional violations are essential for maintaining a safe and compliant workplace, and we have incorporated them into the model’s training for improved accuracy and detection.

---

## Model Integration

The app uses the **Xception architecture**, a deep convolutional neural network (CNN) that has been pre-trained to recognize regulatory violations. The model is saved as `model.h5` and automatically loaded when the app is run. It classifies images based on the presence or absence of violations, including the newly added critical violations.

### Model Workflow:

1. **Data Processing**: The images are processed using the pre-trained machine learning models to identify violations.
2. **Image Classification**: The model classifies images based on the presence of the following violations:
   - Fall Protection (1926.501)
   - Hazard Communication (1910.1200)
   - Scaffolding (1926.451)
   - Plus other OSHA and ANSI violations.
3. **Regulation Detection**: The model looks for the violations defined above, along with any future regulations that may be added.

The app automatically loads the pre-trained `model.h5` file if it exists in the project folder.

---

## Technical Stack

- **Frontend**: Built using **React** with **TypeScript (TSX)** for a fast and responsive user interface.
- **Backend**: Powered by **Node.js** for server-side logic.
- **Machine Learning**: A pre-trained Xception model saved as `model.h5` is used for regulatory violation detection.
- **Expo Go**: Enables mobile deployment where users can scan a QR code to run the app.
- **npx tunnel**: Used to bypass security restrictions and run the app seamlessly despite network/firewall issues.

---

## Evaluation Metrics

The model’s performance is evaluated using the following metrics:

- **Accuracy**: Measures the overall percentage of correct predictions.
- **Precision**: Measures how many of the predicted violations were actual violations.
- **Recall**: Measures how many actual violations were correctly identified by the model.
- **F1-score**: Combines precision and recall into a single metric to balance both aspects.

---

## Future Enhancements

- **Additional Regulations**: Future versions of the app will include even more regulatory violations from OSHA, ANSI, NFPA, or other relevant standards.
- **Real-Time Detection**: Real-time image scanning and regulatory violation detection for more dynamic use cases.

---

## Conclusion

The Brady Hackathon Project leverages machine learning to detect regulatory violations and promote safety in the workplace. By using pre-trained models like Xception and adding critical violations, we ensure the app's efficacy in identifying common, costly violations. The app is deployed using Expo Go for mobile devices, and a local web version is available for easier access. The app’s accuracy is continually refined with future enhancements planned to expand its scope and functionality.

---


## References

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Python PEP8 Style Guide](https://peps.python.org/pep-0008/)
- [Git Branching Conventions](https://graphite.dev/guides/git-branch-naming-conventions)
- [GitHub Get Started Guide](https://docs.github.com/en/get-started)
- [Keras API Documentation](https://keras.io/2.17/api/)
- [Tensorflow API Documentation](https://www.tensorflow.org/api_docs/python/tf)
- [Pandas API Documentation](https://pandas.pydata.org/pandas-docs/version/1.3.4/user_guide/index.html)

---
