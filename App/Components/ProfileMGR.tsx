import { StyleSheet, Text, View } from "react-native";
import DropDown from "./dropdown";
import Button from "./Button";

// BLUE "#1c4690"
// RED "#E63946"

export default function ProfileMGR() {
    return (
        <>
            <View style={styles.body}>
                <Text style={styles.header}>Manage Profiles</Text>
                <View style={styles.row}>
                    <DropDown profiles={[]} value={""} width={145} toggle={undefined} />
                    <Button width={110} color="#E63946" fontSize={12} text="Delete Profile" onPress={undefined}/>
                    <Button width={90} color="#1c4690" fontSize={12} text="Edit Profile" onPress={undefined}/>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.header}>Manage Reports</Text>
                <View style={styles.row}>
                    
                    <Button width={100} color="#E63946" fontSize={12} text="Delete Report" onPress={undefined}/>
                    <Button width={90} color="#1c4690" fontSize={12} text="View Profile" onPress={undefined}/>
                </View>
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        width: 375,
        alignSelf: "center",
        marginVertical: 5, 
        borderRadius: 10,
        flex: 0,
        borderWidth: 1,
        borderColor: "gray",
    },

    header: {
        padding: 10,
        fontSize: 15,
        backgroundColor: "#1c4690",
        width: 373,
        height: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        color: "white",
        fontWeight: "bold",
    },

    row: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    },

    button: {
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
        marginHorizontal: 5,
        marginTop: 4,
        backgroundColor: "rgba(28,70,144,1)",
        width: 110,
        height: 40,
    },

    buttonContainer: {
        justifyContent: "flex-start",
    },

    text: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold"
    }
});
