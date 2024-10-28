import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Sizes, Fonts } from '../constants/styles';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import useFetchUserDetails from '../hooks/useFetchUserDetails';

const UserInfo = () => {
  const navigation = useNavigation();
  const { userDetails, error } = useFetchUserDetails();

  const defaultDetails = {
    firstName: "John",
    lastName: "Doe",
    city: "Default City",
    state: "Default State",
    profile_picture: require('../assets/images/user.png'),
  };

  const user = userDetails || defaultDetails; 

  return (
    <View style={styles.userInfoWrapStyle}>
      <Image
        source={
          typeof user.profile_picture === 'string'
            ? { uri: user.profile_picture }
            : user.profile_picture
        }
        style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
      />
      <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
        <Text numberOfLines={1} style={{ ...Fonts.blackColor17Bold }}>
         Hello {user.firstName} {user.lastName}
        </Text>
        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
          {user.city}, {user.state}
        </Text>
      </View>
      <TouchableOpacity onPress={() => { navigation.push('Notifications') }}>
        <View style={styles.notificationIconWrapStyle}>
          <Ionicons
            name="notifications"
            size={20}
            color="rgba(58, 155, 195, 0.80)"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  userInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  notificationIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: Sizes.fixPadding - 3.0,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#F3E5F5",
  },
});
