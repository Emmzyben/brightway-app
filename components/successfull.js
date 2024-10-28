import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Successfull = () => {
  const navigation = useNavigation();
  return (
    <View style={localStyles.bgcover}>
      <View style={localStyles.box}>
        <Ionicons name="checkmark-circle" size={50} style={localStyles.icon} />
        <Text style={localStyles.title}>Successful!</Text>
        <TouchableOpacity style={localStyles.btn1} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Okay, Cool</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  icon: {
    color: 'rgba(63, 188, 143, 1)',
    marginBottom: 20,
  },
  title: {
    fontSize: 18.34,
    fontWeight: '700',
    lineHeight: 26.05,
    textAlign: 'center',
    marginBottom: 20,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(58, 155, 195, 0.30)',
    padding: 30,
    borderRadius: 15,
    shadowColor: 'rgba(58, 155, 195, 0.30)', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  bgcover: {
   backgroundColor: '#00000000',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  btn1: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(58, 155, 195, 0.80)',
    marginTop: 20,
    width: 150,
    alignItems: 'center', // Align the button content
    justifyContent: 'center',
  },
});

export default Successfull;
