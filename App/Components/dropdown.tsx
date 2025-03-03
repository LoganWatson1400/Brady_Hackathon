import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function DropDown(
    props: { profiles: any[]; value: string, width: number, toggle: any}) {


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
                data={props.profiles}
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
                value={props.value}
                onChange={props.toggle}
            />
        </View>
    );
}
