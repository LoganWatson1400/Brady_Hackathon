import { StyleSheet, Text, View } from "react-native";
import DropDown from "./dropdown";
import Button from "./Button";
import Report from "./Report";
import { useState } from "react";
import { deleteProfile } from "./profiles";
import EditProfile from "./editProfile";

// BLUE "#1c4690"
// RED "#E63946"

export default function ProfileMGR() {
    const [profile, setProfile] = useState();
    const [doThis, setDoThis] = useState("");
    const [edit, setEdit] = useState(false);
 

    if(doThis == "Delete") {
        setDoThis("");
        deleteProfile(profile);
    }

    if(doThis == "Edit") {
        setDoThis("");
        setEdit(true);
    }

    return (
        <>
            <View style={styles.body}>
                <Text style={styles.header}>Manage Profiles</Text>
                <View style={styles.row}>
                    <DropDown value={""} width={225} setProfile={setProfile} />
                    <Button display={true} width={60} color="#E63946" fontSize={12} text="Delete" onPress={() => setDoThis("Delete")}/>
                    <Button display={true} width={60} color="#1c4690" fontSize={12} text="Edit" onPress={() => setDoThis("Edit")}/>
                </View>
                <EditProfile show={edit} callback={()=> setEdit(false)}/>

            </View>
            <View style={styles.body}>
                <Text style={styles.header}>Manage Reports</Text>
                <Report your_name="test" report_name="test"/>
                
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
