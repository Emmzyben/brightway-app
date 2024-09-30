import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import UserInfo from '../../components/userInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const userList = [
    {
        id: '1',
        RecordType: 'Clock In',
        time: '2/2/2024  2:00pm ',
    },
    {
        id: '2',
        RecordType: 'Clock Out',
        time: '2/2/2024  2:00pm ',
    },
];

const pendingNotifications = [
    {
        id: '1',
        notification: 'New chat from Adam',
        time: '2/2/2024  2:00pm ',
    },
    {
        id: '2',
        notification: 'New chat from Rita',
        time: '2/2/2024  2:00pm ',
    },
];

const StaffHome = ({ navigation }) => {
    const [clockedIn, setClockedIn] = useState(false);

    // Handle the clock in and out logic
    function handleClockIn() {
        setClockedIn(!clockedIn);
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <UserInfo />
            <FlatList
                ListHeaderComponent={
                    <>
                        {renderClockIn()}
                        {renderClockRecords()}
                        {renderNotifications()}
                    </>
                }
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
            />
        </View>
    );

function renderClockIn() {
    return ( 
        <View style={{marginBottom:40}}>
            <View style={styles.container}>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={Fonts.blackColor18SemiBold}>
                        Click Button to Clock In/Out
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: clockedIn ? 'orange' : 'rgba(58, 155, 195, 0.80)' }]} 
                    onPress={handleClockIn} 
                >
                    <Text style={styles.buttonText}>
                        {clockedIn ? 'Clock Out' : 'Clock In'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


    // Render notifications
    function renderNotifications() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Notifications') }}
                style={styles.hospitalInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View
                style={{
                  backgroundColor: "#F3E5F5",
                  ...styles.notificationIconWrapStyle,
                }}
              >
                <Ionicons
                  name="notifications"
                  size={20}
                  color='rgba(58, 155, 195, 0.80)'
                />
                </View>
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0 }}>
                        <Text numberOfLines={1} style={Fonts.blackColor16Medium}>
                            {item.notification}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
        return (
            <View>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={Fonts.blackColor18SemiBold}>
                        Notifications
                    </Text>
                </View>
                <FlatList
                    data={pendingNotifications}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}
                />
            </View>
        );
    }

    // Render clock records
    function renderClockRecords() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.hospitalInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                style={{
                  backgroundColor: "#F3E5F5",
                  ...styles.notificationIconWrapStyle,
                }}
              >
                <Ionicons
                  name="timer"
                  size={20}
                  color='rgba(58, 155, 195, 0.80)'
                />
              </View>
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0 }}>
                        <Text numberOfLines={1} style={Fonts.blackColor16Medium}>
                            {item.RecordType}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
        return (
            <View>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={Fonts.blackColor18SemiBold}>
                        Today's Attendance Record
                    </Text>
                </View>
                <FlatList
                    data={userList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}
                />
            </View>
        );
    }
};

export default StaffHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 50,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
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
        justifyContent: "center",marginRight:10
      },
});
