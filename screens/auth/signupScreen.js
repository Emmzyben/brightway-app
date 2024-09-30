import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';
import { Picker } from '@react-native-picker/picker';

const SignupScreen = ({ navigation }) => {
  // State for role selection
  const [role, setRole] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {backArrow()}
        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
          {signupInfo()}
          {selectRole()}
          {signupButton()}
        </ScrollView>
      </View>
      {alreadyAccountInfo()}
    </View>
  );

  function backArrow() {
    return (
      <MaterialIcons
        name='arrow-back'
        color={Colors.blackColor}
        size={24}
        onPress={() => { navigation.pop(); }}
        style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
      />
    );
  }

  function alreadyAccountInfo() {
    return (
      <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor14Medium }}>
        Already have an account?{' '}
        <Text onPress={() => { navigation.push('Login'); }} style={{ ...Fonts.primaryColor14Bold }}>
          Sign In
        </Text>
      </Text>
    );
  }

  function selectRole() {
    return (
      <View style={styles.picker}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Select Role" value="" />
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Provider" value="provider" />
          <Picker.Item label="Staff" value="staff" />
          <Picker.Item label="Driver" value="driver" />
        </Picker>
      </View>
    );
  }

  function signupButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSignup}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>
          Proceed
        </Text>
      </TouchableOpacity>
    );
  }

  function handleSignup() {
    // Conditional navigation based on role
    if (role === 'user') {
      navigation.push('Signup1'); // Navigate to user signup screen
    } else if (role === 'provider') {
      navigation.push('Signup2'); // Navigate to provider signup screen
    } else if (role === 'staff') {
      navigation.push('Signup3'); // Navigate to staff signup screen
    } else if (role === 'driver') {
      navigation.push('Signup4'); // Navigate to driver signup screen
    } else {
      alert('Please select a role'); // Show an alert if no role is selected
    }
  }

  function signupInfo() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...Fonts.blackColor22Bold }}>
          Sign Up!
        </Text>
        <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
          Please select sign up role to continue
        </Text>
      </View>
    );
  }
};

export default SignupScreen;

const styles = StyleSheet.create({
  picker: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.bodyBackColor,
    marginTop: Sizes.fixPadding * 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 8.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 4.0,
    elevation: 2.0,
    ...CommonStyles.buttonShadow,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});
