import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';

const SignupScreen = ({ navigation }) => {

    const [fullName, setfullName] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [securePasswrod, setsecurePasswrod] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {signupInfo()}
                    {fullNameInfo()}
                    {mobileNumberInfo()}
                    {emailAddressInfo()}
                    {passwordInfo()}
                    {termsAndConditionInfo()}
                    {signupButton()}
                </ScrollView>
            </View>
            {alreadyAccountInfo()}
        </View>
    )

    function backArrow() {
        return (
            <MaterialIcons
                name='arrow-back'
                color={Colors.blackColor}
                size={24}
                onPress={() => { navigation.pop() }}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
            />
        )
    }

    function alreadyAccountInfo() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor14Medium }}>
                Already have an account? { }
                <Text onPress={() => { navigation.push('Login') }} style={{ ...Fonts.primaryColor14Bold }}>
                    Sign In
                </Text>
            </Text>
        )
    }

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Verification') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        )
    }

    function termsAndConditionInfo() {
        return (
            <Text style={{ ...Fonts.grayColor14Medium, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                By creating account and logged in, you agree to our
                <Text style={{ ...Fonts.primaryColor14Bold }}>
                    { } Terms & Conditions { }
                </Text>
                and
                <Text style={{ ...Fonts.primaryColor14Bold }}>
                    { } Privacy Policy.
                </Text>
            </Text>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Password
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                        <MaterialIcons
                            name="lock"
                            color={password ? Colors.primaryColor : Colors.grayColor}
                            size={20}
                        />
                        <TextInput
                            value={password}
                            onChangeText={(value) => { setpassword(value) }}
                            style={styles.textFieldStyle}
                            cursorColor={Colors.primaryColor}
                            selectionColor={Colors.primaryColor}
                            secureTextEntry={securePasswrod}
                            placeholder="Enter Password"
                            placeholderTextColor={Colors.grayColor}
                        />
                    </View>
                    <MaterialCommunityIcons
                        name={securePasswrod ? 'eye-off' : "eye"}
                        size={18}
                        color={Colors.blackColor}
                        onPress={() => { setsecurePasswrod(!securePasswrod) }}
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
                        color={email ? Colors.primaryColor : Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={email}
                        onChangeText={(value) => { setemail(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType="email-address"
                        placeholder='Enter EmailAddress'
                        placeholderTextColor={Colors.grayColor}
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
                        color={mobileNumber ? Colors.primaryColor : Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={mobileNumber}
                        onChangeText={(value) => { setmobileNumber(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType="phone-pad"
                        placeholder='Enter MobileNumber'
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Full Name
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='person'
                        color={fullName ? Colors.primaryColor : Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={fullName}
                        onChangeText={(value) => { setfullName(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter FullName"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }

    function signupInfo() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ ...Fonts.blackColor22Bold }}>
                    Sign Up!
                </Text>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                    Please Sign Up using your personal{`\n`}details to continue
                </Text>
            </View>
        )
    }
}

export default SignupScreen

const styles = StyleSheet.create({
    exitWrapStyle: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
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
        padding: Sizes.fixPadding + 8.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        elevation: 2.0,
        ...CommonStyles.buttonShadow,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    checkBoxStyle: {
        borderWidth: 1.0,
        width: 16.0,
        height: 16.0,
        borderRadius: Sizes.fixPadding - 8.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})