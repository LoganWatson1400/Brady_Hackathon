import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Output from './Output';

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
                        <View style={{position: "absolute", top: 0, height: 460}}>
                            <Image source={{ uri: photo }} style={{ width: 300, height: 400, marginBottom: 5 }} />

                            {/* Retake & Upload Buttons (Side by Side & Centered) */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {/* Retake Button */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setPhoto(null);
                                        setIsCameraOpen(true);
                                    }}
                                    style={{
                                        padding: 8,
                                        backgroundColor: '#E63946',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 5,
                                        height: 40,
                                        width: 80,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: "bold" }}>Retake</Text>
                                </TouchableOpacity>

                                {/* Upload Button */}
                                <TouchableOpacity
                                    onPress={()=> console.log()}
                                    style={{
                                        padding: 8,
                                        backgroundColor: '#1c4690',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 5,
                                        height: 40,
                                        width: 80,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: "bold" }}>Upload</Text>
                                </TouchableOpacity>
                            </View>

                            <Output isViolation={true} violation={"dfgdf"}/>

                        </View>
                    ) : (
                        <View></View>
                    )}
                </>
            )}
        </View>
    );
};
