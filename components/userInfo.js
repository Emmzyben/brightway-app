import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../constants/styles'
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
const UserInfo = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.userInfoWrapStyle}>
            <Image
                source={require('../assets/images/users/user1.png')}
                style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
            />
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor17Bold }}>
                    Hello, Samantha Smith
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                    Pasadena, Oklahoma
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => { navigation.push('Notifications') }}
            >
            <View
                style={{
                  backgroundColor: "#F3E5F5",
                  ...styles.notificationIconWrapStyle,
                }}
              >
                <Ionicons
                  name="notifications"
                  size={20}
                  color='rgba(58, 155, 195, 0.80)'
                />
              </View>
              </TouchableOpacity>
        </View>
    )
}

export default UserInfo

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
        justifyContent: "center",margin:10
      },
})