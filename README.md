---

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

## New Proposed Violations to Add

While the current model is focused on detecting violations related to OSHA and ANSI regulations, we have proposed adding the following **three critical violations** that are not yet part of the trained model. These violations have resulted in significant fines for companies failing to observe them, and they are important for workplace safety:

1. **Fall Protection – General Requirements (1926.501)**  
   - **Description**: Fall protection is required in all situations where employees are exposed to falls of six feet or more.  
   - This regulation is crucial for preventing falls from elevated surfaces, a leading cause of workplace injuries and fatalities.

2. **Hazard Communication (1910.1200)**  
   - **Description**: Employers must inform workers about hazardous chemicals in their workplaces and provide proper training.  
   - Ensuring employees are aware of the chemicals they may encounter on the job is vital to preventing harmful exposure and accidents.

3. **Scaffolding (1926.451)**  
   - **Description**: Scaffolding must be properly erected, supported, and maintained to ensure worker safety.  
   - Scaffolding-related accidents can result in severe injuries, making compliance with safety standards essential for workplace safety.

These proposed violations are critical for maintaining a safe and compliant workplace. They are important additions that we aim to train the model on in future versions for improved accuracy and detection.

---

## Model Integration

The app uses the **Xception architecture**, a deep convolutional neural network (CNN), to classify images. The Xception model has been pre-trained to recognize general objects and patterns, but we have built on top of this model to specifically classify regulatory violations.

### Model Workflow:

1. **Image Capture**: Users can take a new picture using the app.
2. **Image Classification**: The app uses the Xception model to classify whether the image contains any regulatory violations.
3. **Violation Detection**: The model then detects specific violations based on the image content, including OSHA and ANSI violations as well as the newly proposed critical violations.
4. **Real-time Feedback**: The app provides real-time feedback, notifying the user if a violation is detected.

The app also allows users to **upload images** for analysis. After uploading, the model will classify the image and check for potential regulatory violations.

The model is pre-trained on various regulatory violations, but for future versions, we aim to train the model on the newly proposed violations to improve detection accuracy.

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

- **Training on New Violations**: Future versions will incorporate training on the newly proposed violations for improved accuracy.
- **Real-Time Detection**: The app already performs real-time image scanning and regulatory violation detection by taking a picture and instantly identifying violations.

---

Conclusion

The Brady Hackathon project is a mobile application aimed at improving workplace safety by detecting regulatory violations in images. Using a pre-trained Xception model, the app classifies images to identify violations related to OSHA and ANSI standards, with future plans to incorporate additional regulations. The app provides real-time feedback, helping users quickly assess compliance and mitigate safety risks. With enhancements such as real-time detection and image upload capabilities, the app offers a practical solution to maintain a safer and more compliant workplace. The ongoing development and integration of new violations will ensure that the app evolves to meet the growing need for workplace safety and regulatory adherence.

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
