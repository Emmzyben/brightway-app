import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from '../../components/myStatusBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const BookDriver = ({ navigation }) => {
    const [service, setService] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [date, setDate] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [destination, setDestination] = useState('');

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setShowTimePicker(false);
        setDate(currentDate);
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
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}>
                <Text style={{ ...Fonts.whiteColor17Bold }}>Book Now</Text>
            </TouchableOpacity>
        );
    }

    function patientName() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>Select Patient</Text>
                <View style={styles.picker}>
                    <Picker selectedValue={selectedPatient} onValueChange={(itemValue) => setSelectedPatient(itemValue)}>
                        <Picker.Item label="Select patient" value="" />
                        <Picker.Item label="Emma Rooke" value="emma" />
                        <Picker.Item label="George Bush" value="george" />
                        <Picker.Item label="Jack Cloney" value="jack" />
                    </Picker>
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
                        {date ? date.toDateString() : 'Select Date'}
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
                        {date ? date.toTimeString().slice(0, 5) : 'Select Time'}
                    </Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker value={date} mode="time" display="default" onChange={handleDateChange} />
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
