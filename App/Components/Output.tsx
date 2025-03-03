import { View, Text, StyleSheet } from "react-native";

export default function Output(props: {isViolation: boolean, violation: string | undefined}) {
    return(
        <View style={styles.body}>
            <Text style={styles.text}>Output: 
                <Text style={props.isViolation ? styles.violation : styles.output}>    {props.isViolation ? "Violation: " + props.violation : "No Violation Detected"}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: 300,
      marginTop: 20,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
    },

    text: {
        fontWeight: "bold",
        fontSize: 14,
    },

    output: {
        fontWeight: "normal",
        fontSize: 14,
    },

    violation: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#E63946',
    }
})