import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { predictFromImage, loadModel } from '@/components/modelScript'

export default function Camera(props: {open: boolean, onChange: any}) {
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState<string | null>(null);
    const cameraRef = useRef<CameraView | null>(null);

    // Request permission on mount
    useEffect(() => {
        if (!permission || permission.status !== 'granted') {
            requestPermission();
        }

        if(props.open) setIsCameraOpen(true);

    }, [permission, props.open]);

    // Handle taking a picture
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const capturedPhoto = await cameraRef.current.takePictureAsync();
                if (capturedPhoto?.uri) {
                    setPhoto(capturedPhoto.uri);
                    setIsCameraOpen(false);
                }
            } catch (error) {
                console.error("Error taking photo:", error);
            }
        }
    };

     const uploadImage = async () => {
        if (!photo) return;

        setIsUploading(true);
        setUploadResult(null);

        try {
            // Ensure the model is loaded
            await loadModel();

            // Run prediction on the selected image
            const predictions = await predictFromImage(photo);
            
            // Process predictions (Modify as needed)
            setUploadResult(`Predictions: ${predictions.join(", ")}`);
        } catch (error) {
            console.error("Error processing image:", error);
            setUploadResult("Prediction failed. Check the model.");
        }

        setIsUploading(false);
    };

    // Handle missing permissions
    if (!permission) return <Text>Requesting Camera Permission...</Text>;
    if (!permission.granted) return <Text>No Camera Permissions!</Text>;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isCameraOpen ? (
                <>
                    <CameraView
                        ref={cameraRef}
                        style={{ flex: 1, width: '100%' }}
                        facing="back"
                    />

                    {/* Close Camera & Take Picture Buttons (Side by Side & Centered) */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 20 }}>
                        
                        {/* Close Camera Button (Left) */}
                        <TouchableOpacity
                            onPress={() => {setIsCameraOpen(false); props.onChange()}}
                            style={{
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                backgroundColor: '#E63946',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 10, // Space between buttons
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Close Camera</Text>
                        </TouchableOpacity>

                        {/* Take Picture Button (Right) */}
                        <TouchableOpacity
                            onPress={takePicture}
                            style={{
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                backgroundColor: '#1D3557',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    {photo ? (
                        <>

                            <Image source={{ uri: photo }} style={{ width: 300, height: 400, marginBottom: 20 }} />

                            {/* Retake & Upload Buttons (Side by Side & Centered) */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {/* Retake Button */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setPhoto(null);
                                        setIsCameraOpen(true);
                                    }}
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        backgroundColor: 'orange',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 10,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 20 }}>Retake</Text>
                                </TouchableOpacity>

                                {/* Upload Button */}
                                <TouchableOpacity
                                    onPress={uploadImage}
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        backgroundColor: 'green',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 20 }}>Upload</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Show Upload Result */}
                            {isUploading ? (
                                <ActivityIndicator size="large" color="blue" style={{ marginTop: 10 }} />
                            ) : (
                                uploadResult && <Text style={{ fontSize: 18, color: 'black', marginTop: 10 }}>{uploadResult}</Text>
                            )}
                        </>
                    ) : (
                        <View></View>
                        /* Centered Take Picture Button */
                        //<TouchableOpacity
                        //    onPress={() => setIsCameraOpen(true)}
                        //    style={{ padding: 10, backgroundColor: 'rgba(28,70,144,1)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                        //>
                        //</>    <Text style={{ color: 'white', fontSize: 20 }}>Take Picture</Text>
                        //</TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
};
