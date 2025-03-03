import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { deleteReport } from "./reports";
import { useState } from "react";


export default function Report(
    props: { your_name: string | undefined, report_name: string | undefined}
) {
    const [show, setShow] = useState(props.report_name == undefined);

    const remove = () => {
        deleteReport(props.report_name);
        setShow(true);
    }

    return (
        <View style={{display: show  ? "none" : "flex"}}>
            <View style={styles.row}>
                <View style={styles.body}>
                    <Text style={styles.text}>{props.report_name}</Text>
                    <Text style={styles.text}>{props.your_name}</Text>
                </View>
                <Button
                    display={true}
                    width={60}
                    color="#E63946"
                    fontSize={12}
                    text="Delete"
                    onPress={remove}
                />
                <Button
                    display={true}
                    width={60}
                    color="#1c4690"
                    fontSize={12}
                    text="View"
                    onPress={undefined}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
     row: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    },

    text: {
        verticalAlign: "middle",
        padding: 8,
        marginHorizontal: 10,
    },

    body: {
        margin: 5,
        width: 220,
        borderRadius: 10,
        height: 40,
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "gray",
    }
})
