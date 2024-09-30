import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const EditProfileScreen = ({ navigation }) => {

    const [fullName, setfullName] = useState('Samantha Smith');
    const [mobileNumber, setmobileNumber] = useState('+1 789-896-159');
    const [email, setemail] = useState('samanthasmith@gmail.com');
    const [password, setpassword] = useState('123456789');
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    <View style={{ backgroundColor: Colors.whiteColor, marginVertical: Sizes.fixPadding }}>
                        {profilePic()}
                        {fullNameInfo()}
                        {mobileNumberInfo()}
                        {emailAddressInfo()}
                        {passwordInfo()}
                    </View>
                </ScrollView>
            </View>
            {updateButton()}
            {changeProfilePicOptionsSheet()}
        </View>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showBottomSheet}
                onRequestClose={() => { setShowBottomSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowBottomSheet(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={styles.bottomSheetStyle}>
                                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                                    Choose Option
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding * 2.5, flexDirection: 'row', }}>
                                    {changeProfilePicOptionsSort({ bgColor: '#009688', icon: 'camera', option: 'Camera' })}
                                    <View style={{ marginHorizontal: Sizes.fixPadding * 3.0, }}>
                                        {changeProfilePicOptionsSort({ bgColor: '#00A7F7', icon: 'image', option: 'Gallery' })}
                                    </View>
                                    {changeProfilePicOptionsSort({ bgColor: '#DD5A5A', icon: 'delete', option: 'Remove photo' })}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function changeProfilePicOptionsSort({ bgColor, icon, option }) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowBottomSheet(false) }}>
                <View style={{ ...styles.changeProfilePicOptionsIconWrapStyle, backgroundColor: bgColor, }}>
                    <MaterialCommunityIcons name={icon} size={24} color={Colors.whiteColor} />
                </View>
                <Text style={styles.profileOptionTextStyle}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function updateButton() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.pop() }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                   Update Password
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='lock'
                        color={Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={password}
                        onChangeText={(value) => { setpassword(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        secureTextEntry={true}
                    />
                </View>
            </View>
        )
    }

    function emailAddressInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Email Address
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='email'
                        color={Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={email}
                        onChangeText={(value) => { setemail(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType="email-address"
                    />
                </View>
            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Mobile Number
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='phone-android'
                        color={Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={mobileNumber}
                        onChangeText={(value) => { setmobileNumber(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Full Name
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='person'
                        color={Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={fullName}
                        onChangeText={(value) => { setfullName(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function profilePic() {
        return (
            <View style={{ alignSelf: 'center', marginTop: Sizes.fixPadding * 3.0, marginBottom: Sizes.fixPadding * 2.5 }}>
                <Image
                    source={require('../../assets/images/users/user1.png')}
                    style={{ width: width / 4.3, height: width / 4.3, borderRadius: (width / 4.3) / 2.0, }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setShowBottomSheet(true) }}
                    style={styles.cameraIconWrapStyle}
                >
                    <MaterialIcons
                        name='camera-alt'
                        color={Colors.primaryColor}
                        size={width / 25.0}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Edit Profile
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default EditProfileScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    cameraIconWrapStyle: {
        width: width / 13.5,
        height: width / 13.5,
        borderRadius: (width / 13.5) / 2.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0.0,
        right: 0.0,
        elevation: 2.0,
        shadowColor: Colors.blackColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 7.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding,
    },
    textFieldStyle: {
        flex: 1,
        ...Fonts.blackColor16Medium,
        height: 20.0,
        marginLeft: Sizes.fixPadding
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 8.0,
        marginBottom: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        ...CommonStyles.buttonShadow,
    },
    changeProfilePicOptionsIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.5,
    },
    profileOptionTextStyle: {
        textAlign: 'center',
        maxWidth: width / 4.5,
        marginTop: Sizes.fixPadding - 5.0,
        ...Fonts.grayColor14Medium
    }
})