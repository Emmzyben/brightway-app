import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {

    const [showLogoutDialog, setshowLogoutDialog] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {userInfo()}
                {profileOptions()}
                {contactOptions()}
            </ScrollView>
            {logoutDialog()}
        </View>
    )

    function logoutDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLogoutDialog}
                onRequestClose={() => { setshowLogoutDialog(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setshowLogoutDialog(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ ...styles.dialogStyle, alignSelf: 'center' }}
                        >
                            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                    Sure you want to logout?
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding + 8.0, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text onPress={() => { setshowLogoutDialog(false) }} style={{ ...Fonts.primaryColor16Bold }}>
                                        Cancel
                                    </Text>
                                    <Text onPress={() => { setshowLogoutDialog(false), navigation.push('Login') }} style={{ marginLeft: Sizes.fixPadding * 2.5, ...Fonts.primaryColor16Bold }}>
                                        Logout
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function contactOptions() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                {optionShort({ iconName: 'headset-mic', option: 'Contact us', onPress: () => { navigation.push('Contactus') }, bgColor: Colors.pinkColor })}
                {optionShort({ iconName: 'text-snippet', option: 'Terms & Conditions', onPress: () => { navigation.push('TermsAndCondition') }, bgColor: Colors.levenderColor })}
                {optionShort({ iconName: 'contact-support', option: 'FAQs', onPress: () => { navigation.push('Faqs') }, bgColor: Colors.darkYellowColor })}
                {optionShort({ iconName: 'logout', option: 'Logout', onPress: () => { setshowLogoutDialog(true) }, bgColor: Colors.coffeeColor })}
            </View>
        )
    }

    function profileOptions() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding * 2.0, }}>
                {optionShort({ iconName: 'person', option: 'My Profile', onPress: () => { navigation.push('EditProfile') }, bgColor: Colors.purpleColor })}
                {optionShort({ iconName: 'notifications', option: 'Notification', onPress: () => { navigation.push('Notifications') }, bgColor: Colors.parrotColor })}
            </View>
        )
    }

    function optionShort({ iconName, option, onPress, bgColor }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.optionWrapStyle}
            >
                <View style={{ ...styles.iconWrapStyle, backgroundColor: bgColor, }}>
                    <MaterialIcons name={iconName} size={18} color={Colors.whiteColor} />
                </View>
                <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 3.0, flex: 1, ...Fonts.blackColor16Medium }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function userInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('EditProfile') }}
                style={styles.userInfoWrapStyle}
            >
                <Image
                    source={require('../../assets/images/doctor/doctor1.png')}
                    style={styles.userImageStyle}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                        Dr. Ismail Sendi
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor15Medium }}>
                        +1 789-896-159
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor20Bold }}>
                    Profile
                </Text>
            </View>
        )
    }
}

export default ProfileScreen

const styles = StyleSheet.create({
    userInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    userImageStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.primaryColor,
        resizeMode: 'contain',
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
        borderRadius: Sizes.fixPadding,
        width: '85%',
        padding: 0
    }
})