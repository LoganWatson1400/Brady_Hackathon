import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { mapProfiles } from "./profiles";
import { useState } from "react";

export default function DropDown(
    props: { value: string, width: number, setProfile: any}) {
    
    const data = [{"value": "New Profile"}];
    const [profiles, setProfiles] = useState(data);
    mapProfiles(profiles, setProfiles);

    const [value, setValue] = useState<string>();
    const toggle = (item: any) => {
        setValue(item.value);
        props.setProfile(item.value);
    };

    const styles = StyleSheet.create({
        container: {
            padding: 5,
            width: props.width,
        },

        dropdown: {
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
        },

        innerStyle: {
            fontSize: 12,
        }
    });

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.innerStyle}
                selectedTextStyle={styles.innerStyle}
                inputSearchStyle={styles.innerStyle}
                data={profiles}
                itemContainerStyle={{ borderRadius: 10 }}
                containerStyle={{ borderRadius: 10, backgroundColor: "white" }}
                autoScroll
                search
                maxHeight={150}
                minHeight={100}
                labelField="value"
                valueField="value"
                searchField="value"
                placeholder={"Choose Profile"}
                searchPlaceholder="Search"
                value={value}
                onChange={toggle}
            />
        </View>
    );
}
