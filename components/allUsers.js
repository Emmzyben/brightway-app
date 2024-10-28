import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useFetchUsers from "../hooks/useFetchUsers";
import { Colors } from "../constants/styles";

const UsersComponent = ({ onSelectuser }) => {
  const { users, loading, error } = useFetchUsers();
  const [selectedUser, setSelectedUser] = React.useState("");

  const handleChange = (itemValue) => {
    setSelectedUser(itemValue);
    onSelectuser(itemValue); 
  };

  if (loading) return <Text>Loading users...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedUser}
        onValueChange={handleChange}
        style={styles.picker}
        dropdownIconColor={Colors.primary}
        mode="dropdown"
      >
        <Picker.Item label="Select a user" value="" />
        {users.map((user) => (
          <Picker.Item
            key={user.id}
            label={`${user.firstName} ${user.lastName}`} 
            value={`${user.id} ${user.firstName} ${user.lastName}`}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  picker: {
    width: "100%",
  },
});

export default UsersComponent;
