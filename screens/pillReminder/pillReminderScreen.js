import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes,CommonStyles } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const reminders = [
    {
        id: '1',
        pillName: 'Multi Vitamins',
        days: 'Mon, Wed, Sun',
        time: '10:00 am, 07:00 pm',
    },
    {
        id: '2',
        pillName: 'Angispan - TR 2.5mg Capsule',
        days: 'Sun',
        time: '10:00 am',
    },
    {
        id: '3',
        pillName: 'Diabetes Pills',
        days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun',
        time: '08:00 pm',
    },
];

const PillReminderScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {allRemindersInfo()}
            </View>
            {addButton()}
        </View>
    )

    function addButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('CreateReminder') }}
                style={styles.addIconWrapStyle}
            >
                <MaterialIcons
                    name='add'
                    color={Colors.whiteColor}
                    size={35}
                />
            </TouchableOpacity>
        )
    }

    function allRemindersInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.reminderWrapStyle}>
                <View style={styles.alarmIconWrapStyle}>
                    <Ionicons name="alarm" size={18} color={Colors.primaryColor} />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        {item.pillName}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 6.0, ...Fonts.grayColor14Medium }}>
                        {item.days} • {item.time}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                data={reminders}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Pill Reminders
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default PillReminderScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    reminderWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 6.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding - 5.0,
    },
    addIconWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20.0,
        right: 20.0,
        elevation:3.0,
        ...CommonStyles.buttonShadow,
    },
    alarmIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.bodyBackColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})