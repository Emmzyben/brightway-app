import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, Dimensions, Image, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';
import useFetchUserDetails from '../../hooks/useFetchUserDetails';
import useUpdateUserDetails from '../../hooks/useUpdateUserDetails'; 
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import Loader from '../../components/activityLoader';

const { width } = Dimensions.get('window');

const EditProfileScreen = ({ navigation }) => {
    const { userDetails, error } = useFetchUserDetails();
    const [loading, setLoading] = useState(false);
    const { updateUserDetails } = useUpdateUserDetails();
    const [profilePicture, setProfilePicture] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
        profile_picture: ''
    });
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    useEffect(() => {
        if (userDetails) {
            setUserInfo({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                mobileNumber: userDetails.mobileNumber,
                email: userDetails.email,
                password: '',
                profile_picture: userDetails.profile_picture,
            });
        }
    }, [userDetails]);

    const handleUpdate = async () => {
        if (!userInfo.firstName || !userInfo.lastName || !userInfo.mobileNumber || !userInfo.email) {
            Alert.alert('Error', 'Please fill all required fields.');
            return;
        }
    
        let updatedFields = {};
        Object.keys(userInfo).forEach(key => {
            if (userInfo[key] !== userDetails[key] && key !== 'password') {
                updatedFields[key] = userInfo[key];
            }
        });
    
        if (userInfo.password) {
            updatedFields.password = userInfo.password;
        }
    
      
        if (Object.keys(updatedFields).length === 0) {
            Alert.alert('Info', 'No changes detected.');
            return;
        }
    
        setLoading(true); 
        const result = await updateUserDetails(updatedFields);
        if (result.success) {
            Alert.alert('Success', 'Profile updated successfully');
            navigation.pop();
        } else {
            Alert.alert('Error', `Error updating profile: ${result.error.message}`);
        }
        setLoading(false);
    };

    const pickImage = async (source) => {
        let result;
        if (source === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setLoading(true);
    
            try {
                const downloadURL = await uploadFile(selectedImage);
                if (downloadURL) {
                    setProfilePicture(downloadURL);
                    setIsUploaded(true); 
                    
                    await handleProfilePictureUpdate(downloadURL);
    
                    Alert.alert('Success', 'Profile picture updated successfully');
                } else {
                    Alert.alert('Upload failed', 'Could not get download URL.');
                }
            } catch (error) {
                console.error('Upload error:', error);
                Alert.alert('Upload failed', 'An error occurred during the upload. Please try again.');
            } finally {
                setLoading(false); 
            }
        }
    };
    
    const handleProfilePictureUpdate = async (downloadURL) => {
        const updatedFields = {
            profile_picture: downloadURL,
        };
    
        setLoading(true);
        try {
            const result = await updateUserDetails(updatedFields);
    
            if (result && result.success) {
                Alert.alert('Success', 'Profile picture updated successfully');
            } else if (result && result.error) {
                throw result.error;
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Error updating profile picture:', error);
            Alert.alert('Error', `Error updating profile picture: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    

    const uploadFile = async (file) => {
        if (!file || !file.uri) {
            console.error('No file or file.uri provided');
            throw new Error('No valid file selected');
        }

        try {
            const response = await fetch(file.uri);
            const blob = await response.blob();
            const storage = getStorage();
            const storagePath = storageRef(storage, `uploads/${file.uri.split('/').pop()}`); 

            const snapshot = await uploadBytes(storagePath, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL; 
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

<Loader isLoading={loading} />
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    <View style={{ backgroundColor: Colors.whiteColor, marginVertical: Sizes.fixPadding }}>
                        {profilePic()}
                        {inputField('First Name', 'person', userInfo.firstName, (value) => setUserInfo({ ...userInfo, firstName: value })) }
                        {inputField('Last Name', 'person', userInfo.lastName, (value) => setUserInfo({ ...userInfo, lastName: value })) }
                        {inputField('Mobile Number', 'phone-android', userInfo.mobileNumber, (value) => setUserInfo({ ...userInfo, mobileNumber: value }), 'phone-pad') }
                        {inputField('Email Address', 'email', userInfo.email, (value) => setUserInfo({ ...userInfo, email: value }), 'email-address') }
                        {passwordField()}
                    </View>
                </ScrollView>
            </View>
            {updateButton()}
            {changeProfilePicOptionsSheet()}
        </View>
    );

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
                                <Text style={{ ...Fonts.blackColor18SemiBold }}>Choose Option</Text>
                                <View style={{ marginTop: Sizes.fixPadding * 2.5, flexDirection: 'row' }}>
                                    {changeProfilePicOptionsSort({ bgColor: '#009688', icon: 'camera', option: 'Camera', source: 'camera' })}
                                    <View style={{ marginHorizontal: Sizes.fixPadding * 3.0 }}>
                                        {changeProfilePicOptionsSort({ bgColor: '#00A7F7', icon: 'image', option: 'Gallery', source: 'gallery' })}
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

    function changeProfilePicOptionsSort({ bgColor, icon, option, source }) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => pickImage(source)}>
                <View style={{ ...styles.changeProfilePicOptionsIconWrapStyle, backgroundColor: bgColor }}>
                       <MaterialCommunityIcons name={icon} size={24} color={Colors.whiteColor} />
                </View>
                <Text style={styles.profileOptionTextStyle}>{option}</Text>
            </TouchableOpacity>
        )
    }

    function updateButton() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleUpdate}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>Update</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function passwordField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>Update Password</Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons name='lock' color={Colors.lightGrayColor} size={20} />
                    <TextInput
                        value={userInfo.password}
                        onChangeText={(value) => setUserInfo({ ...userInfo, password: value })}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        secureTextEntry={true}
                    />
                </View>
            </View>
        )
    }

    function inputField(label, icon, value, onChange, keyboardType) {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>{label}</Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons name={icon} color={Colors.lightGrayColor} size={20} />
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType={keyboardType}
                    />
                </View>
            </View>
        )
    }

    function profilePic() {
        return (
            <View style={{ alignSelf: 'center', marginTop: Sizes.fixPadding * 3.0, marginBottom: Sizes.fixPadding * 2.5 }}>
                <Image
                    source={userInfo?.profile_picture ? { uri: userInfo.profile_picture } : require('../../assets/images/user.png')}
                    style={{ width: width / 4.3, height: width / 4.3, borderRadius: (width / 4.3) / 2.0 }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setShowBottomSheet(true) }}
                    style={styles.cameraIconWrapStyle}
                >
                    <MaterialIcons name='camera-alt' color={Colors.primaryColor} size={width / 25.0} />
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
        marginBottom: Sizes.fixPadding * 1.0,
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

export default EditProfileScreen;
