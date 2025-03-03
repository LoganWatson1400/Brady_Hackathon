import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Camera(props: {open: boolean}) {
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

        setIsCameraOpen(props.open);

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

    // Upload image to ML API
    const uploadImage = async () => {
        if (!photo) return;

        setIsUploading(true);
        setUploadResult(null);

        try {
            let formData = new FormData();
            // formData.append('file', {
            //     uri: photo,
            //     name: 'image.jpg',
            //     type: 'image/jpeg',
            // });

            const response = await fetch('https://your-ml-api.com/upload', { // Replace with your ML API
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const result = await response.json();
            setUploadResult(result.message || "Upload failed");
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploadResult("no deploy, 2 week. check repo.");
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

                    {/* Capture Photo */}
                    <Pressable onPress={takePicture}>
                        <Image
                            width={50}
                            height={50}
                            style={{
                                width: 50, 
                                height: 50, 
                                tintColor: "rgba(28,70,144,1)",
                                borderRadius: 10,
                                alignItems: 'center',
                                alignSelf: "center",
                                position: "absolute",
                                bottom: 20,
                            }}
                            source={require('../assets/images/camera.png')}
                            alt='Capture'
                        />
                    </Pressable>
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
                    )}
                </>
            )}
        </View>
    );
};
