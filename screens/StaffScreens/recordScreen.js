import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import useGetAllAttendanceRecords from '../../hooks/useGetAllAttendanceRecords'; 
import DateTimePicker from '@react-native-community/datetimepicker';


const { width } = Dimensions.get('screen');

const RecordScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null); 
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { loading, error, records } = useGetAllAttendanceRecords();
    const [filteredRecords, setFilteredRecords] = useState([]);

    useEffect(() => {
        if (records) {
            setFilteredRecords(records);
        }
    }, [records]);

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
            const filtered = records.filter(record => {
                // Check if the date part of the 'clockIn' matches the selected date
                return moment(record.clockIn).format("YYYY-MM-DD") === formattedDate;
            });
            setFilteredRecords(filtered);
        } else {
            // If no date is selected, show all records
            setFilteredRecords(records);
        }
    }, [selectedDate, records]);

    const handleDateChange = (event, date) => {
        if (date) {
            setSelectedDate(date); // Update selected date
            setShowDatePicker(false); // Hide the date picker after selection
        } else {
            setShowDatePicker(false); // Hide the date picker if the user cancels
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {selectDate()}
            {history()}
        </View>
    );

    function selectDate() {
        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                paddingVertical: Sizes.fixPadding * 2.0,
                paddingHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{
                    ...Fonts.blackColor18SemiBold,
                    marginBottom: Sizes.fixPadding,
                }}>
                    Search by Date
                </Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: Colors.grayColor,
                        borderRadius: Sizes.fixPadding,
                        padding: Sizes.fixPadding,
                        marginBottom: Sizes.fixPadding,
                    }}
                    value={selectedDate ? moment(selectedDate).format("DD MMM YYYY") : "Select a date"} // Display formatted date or placeholder
                    editable={false} // Make it non-editable
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.btn}>
                    <Text style={{ color: Colors.whiteColor }}>Select Date</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate || new Date()} 
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>
        );
    }

    function history() {
        const renderItem = ({ item }) => (
            <TouchableOpacity activeOpacity={0.8} style={styles.hospitalInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: "#F3E5F5",
                        ...styles.notificationIconWrapStyle,
                    }}>
                        <Ionicons
                            name="notifications"
                            size={20}
                            color='rgba(58, 155, 195, 0.80)'
                        />
                    </View>
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0 }}>
                        <Text numberOfLines={1} style={Fonts.blackColor16Medium}>
                            Date: {moment(item.date).format("DD MMM YYYY")} 
                        </Text>
                        <Text numberOfLines={1} style={{
                            marginTop: Sizes.fixPadding - 8.0,
                            marginBottom: Sizes.fixPadding - 5.0,
                            ...Fonts.grayColor14Medium
                        }}>
                            Clock In: {moment(item.clockIn).format("hh:mm A")}
                        </Text>
                        <Text numberOfLines={1} style={{
                            marginTop: Sizes.fixPadding - 8.0,
                            marginBottom: Sizes.fixPadding - 5.0,
                            ...Fonts.grayColor14Medium
                        }}>
                            Clock Out: {item.clockOut ? moment(item.clockOut).format("hh:mm A") : "N/A"}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

        return (
            <View>
                {loading && <Text style={{ textAlign: 'center' }}>Loading...</Text>}
                {error && <Text style={{ textAlign: 'center', color: 'red' }}>Error: {error}</Text>}
                <FlatList
                    data={filteredRecords}
                    keyExtractor={(item) => `${item.userId}`} 
                    renderItem={renderItem}
                    scrollEnabled={true}
                    automaticallyAdjustKeyboardInsets={true}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 20 }}>No records found.</Text>}
                />
            </View>
        );
    }

    function header() {
        return (
            <View style={styles.headerStyle}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Attendance History
                </Text>
            </View>
        );
    }
}

export default RecordScreen;

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    hospitalInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding,
    },
    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 3.0,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    btn: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    },
});
