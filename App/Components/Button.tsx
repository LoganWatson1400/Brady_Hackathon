import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button(props: {display: boolean, width: number, color: string, fontSize: number, text: string, onPress: any}) {

    const styles = StyleSheet.create({
        button: {
            padding: 8,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "gray",
            marginHorizontal: 5,
            margin: 5,
            backgroundColor: props.color,
            width: props.width,
            height: 40,
            justifyContent: "center",
        },

        buttonContainer: {
            justifyContent: "flex-start",
            display: props.display ? "flex" : "none",
        },

        text: {
            color: "white",
            fontSize: props.fontSize,
            fontWeight: "bold",
            textAlign: "center",
    
        },
    });


    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>
            </Pressable>
        </View>
    );
}