import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity ,ActivityIndicator,Alert} from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { database } from "../../firebase/firebase";
import { ref, set, get, child, push} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Loader from '../../components/activityLoader';


const SignupScreen4 = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');
    const [email, setemail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [usertype, setUsertype] = useState('driver');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [securePasswrod, setsecurePasswrod] = useState(true);
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

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

        console.log('Image selection result:', result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            console.log('Selected image:', selectedImage);

            setLoading(true); // Start loading

            try {
                const downloadURL = await uploadFile(selectedImage);
                console.log('Image download URL:', downloadURL);

                if (downloadURL) {
                    setProfilePicture(downloadURL);
                    setIsUploaded(true); // Change the upload status
                } else {
                    Alert.alert('Upload failed', 'Could not get download URL.');
                }
            } catch (error) {
                console.error('Upload error:', error);
                Alert.alert('Upload failed', 'An error occurred during the upload. Please try again.');
            } finally {
                setLoading(false); // Stop loading after upload attempt
            }
        }
    };
    function selectImage() {
        Alert.alert("Select Image", "Choose a source", [
            {
                text: "Camera",
                onPress: () => pickImage('camera'),
            },
            {
                text: "Gallery",
                onPress: () => pickImage('gallery'),
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    }
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

            // Upload the file
            const snapshot = await uploadBytes(storagePath, blob);
            console.log('Uploaded a blob or file!', snapshot);

            // Get the download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL; 
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error; // Rethrow the error for further handling
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(Platform.OS === 'ios');
        setDob(currentDate);
    };
    
    const handleSignup = async () => {
        console.log("Signup started");
        setLoading(true); 
        // Validate input fields
        if (!firstName || !lastName || !mobileNumber || !email || !address || !state || !city || !zip || !username || !password) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }
        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(password, salt);
    
        
        const userData = {
            firstName,
            lastName,
            mobileNumber,
           email: email.toLowerCase(), 
            address,
            state,
            city,
            zip,
            username: username.toLowerCase(), 
            password: password,
            approved:"unapproved",
            dob: dob.toISOString(),
            usertype: 'driver', 
            profile_picture: profilePicture, 
        };
    
        const dbRef = ref(database);
    
        try {
            const snapshot = await get(child(dbRef, 'users_table'));
            console.log("Users table snapshot retrieved:", snapshot);
    
            // Check if the users table exists and if the email already exists
            if (snapshot.exists()) {
                const users = snapshot.val();
                console.log("Users data retrieved:", users);
                const existingEmail = Object.values(users).some(user => user.email === email);
                console.log("Existing email check:", existingEmail);
                if (existingEmail) {
                    Alert.alert('Registration Failed', 'Email already in use.');
                    return; // Return early if email already exists
                }
            }
    
            // Create a new user entry in the database
            const userRef = push(ref(database, 'users_table')); // Correctly create a new child reference
            await set(userRef, userData);
            console.log("User data set in database:", userData);
    
            // Store user ID in AsyncStorage
            const userId = userRef.key;
            await AsyncStorage.setItem('userId', userId);
            console.log("User ID stored in AsyncStorage:", userId);
    
            // Navigate to verification page
            navigation.push('Verification', { mobileNumber, usertype });
        } catch (error) {
            Alert.alert('Signup failed', 'An error occurred during signup. Please try again.');
            console.error('Signup error:', error); // Log the error for debugging
        } finally {
            setLoading(false); // Stop loading in the finally block
        }
    };
    
  

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {signupInfo()}
                    {firstname()}
                    {lastname()}
                    {mobileNumberInfo()}
                    {emailAddressInfo()}
                    {Dob()}
                    {Address()}
                    {State()}
                    {City()}
                    {zipCode()}
                    {Username()}
                    {passwordInfo()}
                    {profilePictureUpload()}
                    {termsAndConditionInfo()}
                    {signupButton()}
                </ScrollView>
                <Loader isLoading={loading} />
            </View>
            {alreadyAccountInfo()}
        </View>
    )

    function profilePictureUpload() {
        return (
            <TouchableOpacity onPress={selectImage} style={styles.imageUploadButton}>
           
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    {isUploaded ? "Uploaded" : "Upload Profile Picture"}
                </Text>
      
        </TouchableOpacity>
        
        );
    }
    function backArrow() {
        return (
            <MaterialIcons
                name='arrow-back'
                color={Colors.blackColor}
                size={24}
                onPress={() => { navigation.pop() }}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start', }}
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
                onPress={handleSignup}
                style={styles.buttonStyle}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Sign Up
                    </Text>
                )}
            </TouchableOpacity>
        );
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

    function firstname() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0, marginBottom: Sizes.fixPadding * 2.0, }}>
            <Text style={{ ...Fonts.grayColor14Medium }}>
                    First Name
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='person'
                        color={firstName ? Colors.primaryColor : Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={firstName}
                        onChangeText={(value) => { setfirstName(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter First Name"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }
    function lastname() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 0.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Last Name
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='person'
                        color={lastName ? Colors.primaryColor : Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={lastName}
                        onChangeText={(value) => { setlastName(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter Last Name"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }

    function Address() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 0.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Address
                </Text>
                <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
  name='home' // updated from 'address'
  color={address ? Colors.primaryColor : Colors.lightGrayColor}
  size={20}
/>

                    <TextInput
                        value={address}
                        onChangeText={(value) => { setAddress(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter Address"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }


    function State() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 0.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    State
                </Text>
                <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
  name='map' // updated from 'location'
  color={state ? Colors.primaryColor : Colors.lightGrayColor}
  size={20}
/>

                    <TextInput
                        value={state}
                        onChangeText={(value) => { setState(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter State"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }
    function City() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 0.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    City
                </Text>
                <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
  name='map' // updated from 'location'
  color={state ? Colors.primaryColor : Colors.lightGrayColor}
  size={20}
/>
                    <TextInput
                        value={city}
                        onChangeText={(value) => { setCity(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter City"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }
    function zipCode() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 0.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                   Zip code
                </Text>
                <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
  name='location-pin' // updated from 'person'
  color={zip ? Colors.primaryColor : Colors.lightGrayColor}
  size={20}
/>

                    <TextInput
                        value={zip}
                        onChangeText={(value) => { setZip(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Enter Zip Code"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }
    function Username() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Username
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name='person'
                        color={username ? Colors.primaryColor : Colors.lightGrayColor}
                        size={20}
                    />
                    <TextInput
                        value={username}
                        onChangeText={(value) => { setusername(value) }}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        placeholder="Set Username"
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }

    function Dob() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Date of Birth
                </Text>
                <TouchableOpacity
                    style={styles.textFieldWrapStyle}
                    onPress={() => setShowDatePicker(true)}
                >
                    <MaterialIcons
                        name='calendar-today'
                        color={Colors.primaryColor}
                        size={20}
                    />
                    <Text style={styles.textFieldStyle}>
                        {dob ? dob.toDateString() : 'Select Date of Birth'}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        maximumDate={new Date()} // Ensure no future date selection
                    />
                )}
            </View>
        );
    }
    

    function signupInfo() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ ...Fonts.blackColor22Bold }}>
                    Driver Sign-Up
                </Text>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                    Please Sign Up using your personal{`\n`}details to continue
                </Text>
            </View>
        )
    }
}

export default SignupScreen4

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
    },picker: {
        margin:0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.bodyBackColor,
        marginTop: Sizes.fixPadding * 2.0,
        
      },
      selectedServiceText: {
    marginTop: Sizes.fixPadding,
    fontSize: 16,
    color: '#333', 
  },
  imageUploadButton: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth:1,backgroundColor: Colors.bodyBackColor,
    borderColor:0,marginBottom:30
},
})