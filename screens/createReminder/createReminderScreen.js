import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes ,CommonStyles} from '../../constants/styles';
import { BottomSheet } from '@rneui/themed';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import MyStatusBar from '../../components/myStatusBar';

const hoursList = [...range(1, 12)];

const minutesList = [...range(0, 59)];

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const { width } = Dimensions.get('window');

const daysList = [
    {
        id: '1',
        day: 'Mon',
        selected: true,
    },
    {
        id: '2',
        day: 'Tue',
        selected: true,
    },
    {
        id: '3',
        day: 'Wed',
        selected: false,
    },
    {
        id: '4',
        day: 'Thu',
        selected: false,
    },
    {
        id: '5',
        day: 'Fri',
        selected: false,
    },
    {
        id: '6',
        day: 'Sat',
        selected: false,
    },
    {
        id: '7',
        day: 'Sun',
        selected: false,
    },
];

const CreateReminderScreen = ({ navigation }) => {

    const [pillName, setpillName] = useState('');
    const [showSheet, setshowSheet] = useState(false);
    const [days, setdays] = useState(daysList);
    const [selectedHour, setselectedHour] = useState(hoursList[3])
    const [selectedMinute, setselectedMinute] = useState(minutesList[3])
    const [selectedAmPm, setselectedAmPm] = useState('pm');
    const selectedDaysArray = (days.filter((item) => item.selected == true));
    const [selectedDays, setselectedDays] = useState(selectedDaysArray.map(item => item.day).join(', '));
    const selectedTimeDisplay = `${selectedHour.toString().length == 1 ? `0${selectedHour}` : selectedHour}:${selectedMinute.toString().length == 1 ? `0${selectedMinute}` : selectedMinute} ${selectedAmPm}`;
    const [selectedTime, setselectedTime] = useState(selectedTimeDisplay);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {reminderInfo()}
                </ScrollView>
            </View>
            {setReminderButton()}
            {dateTimeSheet()}
        </View>
    )

    function changeDaysSelection({ id }) {
        const copyDays = days;
        const newDays = copyDays.map((item) => {
            if (item.id == id) {
                return { ...item, selected: !item.selected }
            }
            else {
                return item
            }
        })
        setdays(newDays);
    }

    function dateTimeSheet() {
        return (
            <BottomSheet
                onBackdropPress={() => { setshowSheet(false) }}
                isVisible={showSheet}
                scrollViewProps={{scrollEnabled:false}}
            >
                <View style={styles.sheetStyle}>
                    {daysInfo()}
                    {timesInfo()}
                </View>
            </BottomSheet>
        )
    }

    function timesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding, }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                        Select Time
                    </Text>
                    <Text
                        onPress={() => {
                            const selectedDaysArray = (days.filter((item) => item.selected == true));
                            setselectedDays(selectedDaysArray.map(item => item.day).join(', '));
                            const selectedTimeDisplay = `${selectedHour.toString().length == 1 ? `0${selectedHour}` : selectedHour}:${selectedMinute.toString().length == 1 ? `0${selectedMinute}` : selectedMinute} ${selectedAmPm}`;
                            setselectedTime(selectedTimeDisplay);
                            setshowSheet(false)
                        }}
                        style={{ ...Fonts.primaryColor14Bold }}
                    >
                        Done
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {hourPicker()}
                    <Text style={{ ...Fonts.blackColor20Bold, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        :
                    </Text>
                    {minutePicker()}
                    <Text style={{ ...Fonts.blackColor20Bold, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        :
                    </Text>
                    {amPmPicker()}
                </View>
            </View>
        )
    }

    function daysInfo() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                        Select Days
                    </Text>
                    <MaterialIcons
                        name='close'
                        color={Colors.blackColor}
                        size={20}
                        onPress={() => { setshowSheet(false) }}
                    />
                </View>
                <View style={styles.allDaysWrapStyle}>
                    {
                        days.map((item) => (
                            <View
                                key={`${item.id}`}
                                style={{ flexDirection: 'row', flex: 1, }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => { changeDaysSelection({ id: item.id }) }}
                                    style={{ ...styles.daysWrapStyle, backgroundColor: item.selected ? Colors.primaryColor : Colors.bodyBackColor, }}
                                >
                                    <Text numberOfLines={1} style={item.selected ? { ...Fonts.whiteColor14Medium } : { ...Fonts.blackColor14Medium }}>
                                        {item.day}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ width: 0.80, backgroundColor: Colors.whiteColor, height: '100%' }} />
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }

    function amPmPicker() {
        const list = ['am', 'pm'];
        return (
            <ScrollPicker
                dataSource={list}
                selectedIndex={list.indexOf(selectedAmPm)}
                renderItem={(data) => {
                    return (
                        <Text style={data == selectedAmPm ? { ...Fonts.blackColor14Medium, } : { ...Fonts.lightGrayColor14Medium }}>
                            {data}
                        </Text>
                    )
                }}
                onValueChange={(data) => { setselectedAmPm(data) }}
                wrapperColor={Colors.whiteColor}
                itemHeight={50}
                highlightColor={Colors.bodyBackColor}
                highlightBorderWidth={1}
            />
        )
    }

    function hourPicker() {
        return (
            <ScrollPicker
                dataSource={hoursList}
                selectedIndex={hoursList.indexOf(selectedHour)}
                renderItem={(data) => {
                    return (
                        <Text style={data == selectedHour ? { ...Fonts.blackColor14Medium, } : { ...Fonts.lightGrayColor14Medium }}>
                            {data.toString().length == 1 ? `0${data}` : data}
                        </Text>
                    )
                }}
                onValueChange={(data) => { setselectedHour(data) }}
                wrapperColor={Colors.whiteColor}
                itemHeight={50}
                highlightColor={Colors.bodyBackColor}
                highlightBorderWidth={1}
            />
        )
    }

    function minutePicker() {
        return (
            <ScrollPicker
                dataSource={minutesList}
                selectedIndex={minutesList.indexOf(selectedMinute)}
                renderItem={(data) => {
                    return (
                        <Text style={data == selectedMinute ? { ...Fonts.blackColor14Medium, } : { ...Fonts.lightGrayColor14Medium }}>
                            {data.toString().length == 1 ? `0${data}` : data}
                        </Text>
                    )
                }}
                onValueChange={(data) => { setselectedMinute(data) }}
                wrapperColor={Colors.whiteColor}
                itemHeight={50}
                highlightColor={Colors.bodyBackColor}
                highlightBorderWidth={1}
            />
        )
    }

    function setReminderButton() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.pop() }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Set Reminder
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function reminderInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                {pillNameInfo()}
                {daysAndTimeInfo()}
            </View>
        )
    }

    function daysAndTimeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                    Select Days and Time
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setshowSheet(true) }}
                    style={styles.dateAndTimeInfoWrapStyle}
                >
                    <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        {selectedDays} • {selectedTime}
                    </Text>
                    <MaterialIcons
                        name='arrow-drop-down'
                        color={Colors.primaryColor}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function pillNameInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                    Pill Name
                </Text>
                <TextInput
                    placeholder='Enter pill name'
                    placeholderTextColor={Colors.grayColor}
                    value={pillName}
                    onChangeText={(value) => { setpillName(value) }}
                    style={styles.textFieldWrapStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Create Reminder
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default CreateReminderScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    textFieldWrapStyle: {
        ...Fonts.blackColor16Medium,
        backgroundColor: Colors.bodyBackColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0
    },
    dateAndTimeInfoWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 7.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
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
        ...CommonStyles.buttonShadow
    },
    daysWrapStyle: {
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding - 5.0,
        flex: 1,
    },
    allDaysWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden'
    },
    sheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding * 2.0,
    }
})