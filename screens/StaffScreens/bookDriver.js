import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import React, { useState ,useEffect} from 'react';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import UsersComponent from '../../components/allUsers';
import { database } from "../../firebase/firebase";
import { ref, set, get, child, push } from "firebase/database";
import Loader from '../../components/activityLoader';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');

const BookDriver = ({ navigation, route }) => {
    const { driverId,driverName,profile_picture } = route.params;
    const [service, setService] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date()); 
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false); 
    const [userId, setUserId] = useState(null);

useEffect(() => {
    const fetchUserId = async () => {
        const id = await AsyncStorage.getItem("userId");
        setUserId(id);
    };
    fetchUserId();
}, []);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(false);
        setTime(currentTime); 
    };

    const handleSelectPatient = (patientName) => {
        setSelectedPatient(patientName);
        console.log("Selected patient:", patientName);
    };

    const handleBookDriver = async () => {
        console.log("Booking started");
        setLoading(true);
    
        // Check for necessary fields
        if (!selectedPatient || !date || !time || !destination || !service || !driverId) {
            Alert.alert('Error', 'All fields are required!');
            setLoading(false);
            return;
        }
    
        const bookingData = {
            patientid: selectedPatient,
            date: date.toDateString(),
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            destination,
            driverId: driverId,
            driverName,
            profile_picture,
            status: 'pending',
            staffId: userId,
            createdat: new Date().toISOString(),
        };
        
    
        console.log("Booking data to be set:", bookingData);
    
        const dbRef = ref(database);
    
        try {
            const snapshot = await get(child(dbRef, 'driver_booking'));
            console.log("Driver booking table snapshot retrieved:", snapshot.val());
    
            const bookingRef = push(ref(database, 'driver_booking'));
            await set(bookingRef, bookingData);
            console.log("Data set in database:", bookingData);
    
            // Clear the form fields after successful booking
            setSelectedPatient('');
            setService('');
            setDate(new Date());
            setTime(new Date());
            setDestination('');
    
            navigation.push('StaffAppointmentScreen');
        } catch (error) {
            Alert.alert('Booking failed', 'An error occurred during booking. Please try again.');
            console.error('Booking error:', error); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {signupInfo()}
                    {patientName()}
                    {transportType()}
                    {DateSection()}
                    {TimeSection()}
                    {Destination()}
                    {BookButton()}
                </ScrollView>
                <Loader isLoading={loading} />
            </View>
        </View>
    );

    function backArrow() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Book Driver
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    style={{ position: 'absolute', left: 20.0 }}
                    onPress={() => { navigation.pop() }}
                />
            </View>
        );
    }

    function BookButton() {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} onPress={handleBookDriver}>
                <Text style={{ ...Fonts.whiteColor17Bold }}>Book Now</Text>
            </TouchableOpacity>
        );
    }

    function patientName() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>Select Patient</Text>
                <View style={styles.picker}>
                    <UsersComponent onSelectuser={handleSelectPatient} />
                </View>
            </View>
        );
    }

    function DateSection() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>Date</Text>
                <TouchableOpacity style={styles.textFieldWrapStyle} onPress={() => setShowDatePicker(true)}>
                    <MaterialIcons name="calendar-today" color={Colors.primaryColor} size={20} />
                    <Text style={styles.textFieldStyle}>
                        {date ? date.toLocaleDateString() : 'Select Date'}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
                )}
            </View>
        );
    }
    
    function TimeSection() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>Time</Text>
                <TouchableOpacity style={styles.textFieldWrapStyle} onPress={() => setShowTimePicker(true)}>
                    <MaterialIcons name="access-time" color={Colors.primaryColor} size={20} />
                    <Text style={styles.textFieldStyle}>
                        {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
                    </Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker value={time} mode="time" display="default" onChange={handleTimeChange} />
                )}
            </View>
        );
    }

    function transportType() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>Select Transport Type</Text>
                <View style={styles.picker}>
                    <Picker selectedValue={service} onValueChange={(itemValue) => setService(itemValue)}>
                        <Picker.Item label="Select Option" value="" />
                        <Picker.Item label="Pick Up" value="pickup" />
                        <Picker.Item label="Drop Off" value="dropoff" />
                    </Picker>
                </View>
            </View>
        );
    }

    function Destination() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>Select Destination</Text>
                <View style={styles.picker}>
                    <Picker selectedValue={destination} onValueChange={(itemValue) => setDestination(itemValue)}>
                        <Picker.Item label="Select Option" value="" />
                        <Picker.Item label="Day-care Facility" value="daycare" />
                        <Picker.Item label="Patient Home" value="home" />
                    </Picker>
                </View>
            </View>
        );
    }

    function signupInfo() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                    Please Fill the form to Book driver
                </Text>
            </View>
        );
    }
};

export default BookDriver;

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
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
    textFieldWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0,
    },
    textFieldStyle: {
        flex: 1,
        marginLeft: Sizes.fixPadding,
        ...Fonts.blackColor14Regular,
    },
    picker: {
        backgroundColor: Colors.bodyBackColor,
        borderRadius: Sizes.fixPadding - 5.0,
    },
});
