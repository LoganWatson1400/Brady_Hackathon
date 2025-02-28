import React , {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'New Profile', value: 'New Profile', search: 'New Profile' },
  { label: 'Profile', value: 'Profile', search: 'Profile' },
  ];


function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const [value, setValue] = useState<string>();
  const [newProfile, setNewProfile] = useState(false);

  const toggle = (item: any) => {
    setValue(item.value);
    setNewProfile(value === "New Profile" ? false : true);
    }


  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
    setSubmittedData(data);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: 10,
    },
    
    profileName: {
      height: 40,
      borderColor: 'gray',
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
      borderColor: 'gray',
      borderWidth: 1,
      width: 220,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
      display: newProfile ? "flex" : "none",
    },

    yourName: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 220,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
    },
  
    desc: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 380,
      marginBottom: 10,
      padding: 8,
      margin: 5,
      fontSize: 12,
      borderRadius: 10,
      display: newProfile ? "flex" : "none",
    },
  
    button: {
      backgroundColor: "red",
      padding: 5,
      borderRadius: 10,
      margin: 5,
    },
  
    dropContainer: {
      padding: 5,
      width: 160,
    },
    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
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
                data={data}
                autoScroll
                search
                maxHeight={200}
                minHeight={100}
                labelField="label"
                valueField="value"
                searchField="search"
                placeholder={'Choose Profile'}
                searchPlaceholder="Search"
                value={value}
                onChange={toggle}
            />
        </View>
        
      <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.yourName}
              placeholder="Your Name"
            />
          )}
          name="personName"
        />

            <Controller
            control={control}
            render={({ field }) => (
                <TextInput
                {...field}
                style={styles.profileName}
                placeholder="Profile Name"
                />
            )}
            name="profileName"
            />

            <Controller
            control={control}
            render={({ field }) => (
                <TextInput
                {...field}
                style={styles.loc}
                placeholder="Location"
                />
            )}
            name="loc"
            />

            <Controller
            control={control}
            render={({ field }) => (
                <TextInput
                {...field}
                style={styles.desc}
                placeholder="Description"
                />
            )}
            name="desc"
            />

        <View style={styles.button}>
            <Button color="red" title="Start Report" onPress={handleSubmit(onSubmit)} />
        </View>

      </View>
    </SafeAreaView>
  );
}



export default MyForm;