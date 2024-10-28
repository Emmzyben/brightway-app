import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';
import useFetchUserDetails from '../../hooks/useFetchUserDetails';
import { useUser } from "../auth/user";

const ProfileScreen = ({ navigation }) => {
  const { userDetails, error } = useFetchUserDetails();
  const { logout} = useUser(); ; 
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); 

  const defaultDetails = {
    firstName: "John",
    lastName: "Doe",
    profile_picture: require('../../assets/images/users/user1.png'),
  };

  const user = userDetails || defaultDetails; 

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      {header()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {userInfo()}
        {contactOptions()}
      </ScrollView>
      {logoutDialog()}
    </View>
  );

  function logoutDialog() {
    return (
      <Overlay
        isVisible={showLogoutDialog}
        overlayStyle={styles.dialogStyle}
        onBackdropPress={() => { setShowLogoutDialog(false); }}
      >
        <View style={{ margin: Sizes.fixPadding * 2.0 }}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            Sure you want to logout?
          </Text>
          <View style={{ marginTop: Sizes.fixPadding + 8.0, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text onPress={() => { setShowLogoutDialog(false); }} style={{ ...Fonts.primaryColor16Bold }}>
              Cancel
            </Text>
            <Text onPress={handleLogout} style={{ marginLeft: Sizes.fixPadding * 2.5, ...Fonts.primaryColor16Bold }}>
              Logout
            </Text>
          </View>
        </View>
      </Overlay>
    );
  }

  function handleLogout() {
    logout(); // Call the logout function from context
    setShowLogoutDialog(false); // Close the dialog
    navigation.navigate('Login'); // Navigate to Login after logout
  }

  function contactOptions() {
    return (
      <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
        {optionShort({ iconName: 'headset-mic', option: 'Contact us', onPress: () => { navigation.push('Contactus'); }, bgColor: Colors.tomatoColor })}
        {/* {optionShort({ iconName: 'contact-support', option: 'FAQs', onPress: () => { navigation.push('Faqs'); }, bgColor: Colors.darkYellowColor })} */}
        {optionShort({ iconName: 'logout', option: 'Logout', onPress: () => { setShowLogoutDialog(true); }, bgColor: Colors.coffeColor })}
      </View>
    );
  }

  function optionShort({ iconName, option, onPress, bgColor }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.optionWrapStyle}
      >
        <View style={{ ...styles.iconWrapStyle, backgroundColor: bgColor }}>
          <MaterialIcons name={iconName} size={18} color={Colors.whiteColor} />
        </View>
        <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 3.0, flex: 1, ...Fonts.blackColor16Medium }}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function userInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => { navigation.push('EditProfile'); }}
        style={styles.userInfoWrapStyle}
      >
        <Image
         source={
          typeof user.profile_picture === 'string' && user.profile_picture
            ? { uri: user.profile_picture }
            : require('../../assets/images/user.png')
        }
          style={{ width: 50.0, height: 50.0, borderRadius: Sizes.fixPadding - 5.0 }}
        />
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor15Medium }}>
            Click to view and update profile
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
        <Text style={{ textAlign: 'center', ...Fonts.blackColor20Bold }}>
          Profile
        </Text>
      </View>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    marginVertical: Sizes.fixPadding,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizes.fixPadding * 2.0,
  },
  iconWrapStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.5
  },
  dialogStyle: {
    backgroundColor: Colors.whiteColor,
    padding: 0.0,
    borderRadius: Sizes.fixPadding,
    width: '85%',
  },
});
