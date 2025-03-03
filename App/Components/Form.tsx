import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { addProfile, mapProfiles } from "./profiles";
import { addReport } from "./reports";



export default function Form(props: {open: boolean, onChange: any}) {
  const { control, handleSubmit, reset } = useForm();
  const [value, setValue] = useState<string>("");
  const [newProfile, setNewProfile] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    "desc": undefined, 
    "loc": undefined, 
    "person_name": undefined, 
    "profile_name": undefined, 
    "report_name": undefined
  });
  
  const data = [{"value": "New Profile"}];

  const [profiles, setProfiles] = useState(data);

  const toggle = (item: any) => {
    setValue(item.value);
    setNewProfile(item.value === "New Profile" ? true : false);
  };

  if(props.open) {
    mapProfiles(profiles, setProfiles);
  }

  const onSubmit = (formdata: any) => {
    // Sets data only when starting report.
    if(!props.open) {
      setSubmittedData(formdata);
      if(newProfile) {
        addProfile(formdata.profile_name, formdata.loc, formdata.desc);
        setValue(formdata.profile_name);
      
      }
    }

    // Later add report tables.
    else {
      if(!newProfile) formdata.profile_name = value;
      addReport(formdata.profile_name, formdata.person_name, formdata.report_name)
      reset();
    }

    setNewProfile(false);

    props.onChange();
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "center",
      marginTop: 10,
    },

    profileName: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: 150,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
      display: newProfile ? "flex" : "none",
    },

    loc: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: 200,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
      display: newProfile ? "flex" : "none",
    },

    yourName: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: 200,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
    },

    desc: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: 360,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
      display: newProfile ? "flex" : "none",
    },

    report: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      width: 250,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
    },

    button: {
      padding: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "gray",
      marginHorizontal: 5,
      marginTop: 4,
      backgroundColor: "rgba(28,70,144,1)",
      width: 100,
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
    },

    dropContainer: {
      padding: 5,
      width: 160,
    },
    dropdown: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: "absolute",
      backgroundColor: "white",
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 12,
    },
    placeholderStyle: {
      fontSize: 12,
    },
    selectedTextStyle: {
      fontSize: 12,
    },

    inputSearchStyle: {
      height: 40,
      fontSize: 12,
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.dropContainer}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={profiles}
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

        <Controller
          name="person_name"
          control={control}
          render={( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={styles.yourName}
              placeholder={"Your Name"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} 
            />
          )}
        />

        <Controller
        name="profile_name"
          control={control}
          render={( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={styles.profileName}
              placeholder="Profile Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} 
            />
          )}
        />

        <Controller
          name="loc"
          control={control}
          render={( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={styles.loc}
              placeholder="Location"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} 
            />
          )}
        />

        <Controller
          name="desc"
          control={control}
          render={( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={styles.desc}
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} 
            />
          )}
        />

        <Controller
          name="report_name"
          control={control}
          render={( { field: { onChange, onBlur, value } } ) => (
            <TextInput
              style={styles.report}
              placeholder={"Report Name"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} 
            />
          )}
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>{props.open ? "End Report" : "Start Report"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

