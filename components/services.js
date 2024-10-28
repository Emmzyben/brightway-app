import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useGetServices from "../hooks/useGetServices";
import { Colors, Sizes } from "../constants/styles"; 

const ServicesComponent = ({ onSelectService }) => {
  const { services, loading, error } = useGetServices();
  const [selectedService, setSelectedService] = React.useState("");

  const handleChange = (itemValue) => {
    setSelectedService(itemValue);
    onSelectService(itemValue); 
  };

  if (loading) return <Text>Loading services...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedService}
          onValueChange={handleChange}
          style={styles.picker}
          dropdownIconColor={Colors.primary} 
          mode="dropdown" 
        >
          <Picker.Item label="Select a service" value="" enabled={false} />
          {services.map((service, index) => (
            <Picker.Item key={index} label={service} value={service} />
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

export default ServicesComponent;
