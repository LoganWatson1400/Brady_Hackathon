
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const Home = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView | null>(null);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                if(photo && photo.uri){
                    setPhoto(photo.uri);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    if (!permission) return <Text> Requesting Camera Permission... </Text>;
    if (!permission.granted) return <Text> No Camera Permissions! </Text>;

    return (
        <View style={{ flex: 1 }}>
            {!photo ? (
                <>
                    <CameraView ref={cameraRef} style={{ flex: 1 }} />
                    <TouchableOpacity onPress={takePicture} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Take Photo</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: photo }} style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => setPhoto(null)} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>New Photo</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Home;

