import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "./Button";
import { useState } from "react";
import { editProfile } from "./profiles";

export default function EditProfile(props: {
    show: boolean, callback: any
}) {
    const { control, handleSubmit, reset } = useForm();
    const [data, submitData] = useState({
        loc: undefined,
        desc: undefined
    });

    const onSubmit = (formdata: any) => {
        submitData(formdata);

        props.callback();


    };


    const styles = StyleSheet.create({
        body: {
            height: 40,
            alignSelf: "center",
            margin: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "gray",
            display: props.show ? "flex" : "none",
            fontSize: 12
        },

        desc: {
            width: 355
        },

        loc: {
            width: 285
        },

        container: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
        }
    });

    return (
        <View style={styles.container}>
            <Controller
                name="desc"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.desc, styles.body]}
                        placeholder={"Description"}
                        placeholderTextColor="black"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Controller
                name="loc"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.loc, styles.body]}
                        placeholder="Location"
                        placeholderTextColor="black"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Button display={props.show} width={60} color="#1c4690" fontSize={12} text="Submit" onPress={handleSubmit(onSubmit)}/>
        </View>
    );
}
