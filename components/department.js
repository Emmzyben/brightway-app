import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useGetDepartments from "../hooks/useGetDepartment";
import { Colors, Sizes } from "../constants/styles"; 

const DepartmentsComponent = ({ onSelectdepartment }) => {
  const { departments, loading, error } = useGetDepartments();
  const [selecteddepartment, setSelecteddepartment] = React.useState("");

  const handleChange = (itemValue) => {
    setSelecteddepartment(itemValue);
    onSelectdepartment(itemValue); 
  };

  if (loading) return <Text>Loading departments...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerContainer}>
        <Picker
          selectedValue={selecteddepartment}
          onValueChange={handleChange}
          style={styles.picker}
          dropdownIconColor={Colors.primary} 
          mode="dropdown" 
        >
          <Picker.Item label="Select a department" value="" enabled={false} />
          {departments.map((department, index) => (
            <Picker.Item key={index} label={department} value={department} />
          ))}
        </Picker>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({


  pickerContainer: {
    justifyContent: "center",
  },
  picker: {
    width: "100%", 
  },
});

export default DepartmentsComponent;
