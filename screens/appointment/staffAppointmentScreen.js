import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TabView, TabBar } from 'react-native-tab-view';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {CommonStyles } from '../../constants/styles'

const { width } = Dimensions.get('screen');

const upcomingAppointmentsList = [
    {
        id: '1',
        patientName: 'Mr. Ismail Sendi',
        driver: 'Robert Hooks',
        type: 'pick up',
        appointmentDate: '12 Jan 2020',
        appointmentTime: '12:00 pm',
    },
    {
        id: '2',
        patientName: 'Mrs. Barry George',
        driver: 'Robert Hooks',
        type: 'pick up',
        appointmentDate: '15 Jan 2020',
        appointmentTime: '11:30 pm',
    },
    {
        id: '3',
        patientName: 'Mr. Howard Axe',
        driver: 'Robert Hooks',
        type: 'pick up',
        appointmentDate: '17 Jan 2020',
        appointmentTime: '10:00 pm',
    },
];

const CompletedAppointmentsList = [
    {
        id: '1',
        patientName: ' Sally Amsel',
        driver: 'Robert Hooks',
        type: 'pick up',
        appointmentDate: '12 Jan 2020',
        appointmentTime: '11:30 pm',
    },
    {
        id: '2',
        patientName: ' Don Doman',
        driver: 'Robert Hooks',
        type: 'pick up',
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '3',
        patientName: ' Carol Pollack',
        driver: 'Robert Hooks',
         type: 'pick up',
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '4',
        patientName: ' Jean Bocage',
        driver: 'Robert Hooks',
         type: 'pick up',
        appointmentDate: '9 Jan 2020',
        appointmentTime: '10:00 pm',
    },
];
const CancelledAppointmentsList = [
    {
        id: '1',
        patientName: ' Sally Amsel',
        driver: 'Robert Hooks',
         type: 'pick up',
        appointmentDate: '12 Jan 2020',
        appointmentTime: '11:30 pm',
    },
    {
        id: '2',
        patientName: ' Don Doman',
        driver: 'Robert Hooks',
         type: 'pick up',
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '3',
        patientName: ' Carol Pollack',
        driver: 'Robert Hooks',
         type: 'pick up',
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '4',
        patientName: ' Jean Bocage',
        driver: 'Robert Hooks',
         type: 'pick up',
        appointmentDate: '9 Jan 2020',
        appointmentTime: '10:00 pm',
    },
];

const StaffAppointmentScreen = ({ navigation }) => {

        const [index, setIndex] = useState(0);
        const [routes] = useState([
            { key: 'first', title: 'Upcoming' },
            { key: 'second', title: 'Completed' },
            { key: 'third', title: 'Cancelled' },
        ]);
        const [upcomingAppointments, setupcomingAppointments] = useState(upcomingAppointmentsList);
        const [showUpcomingOptionMenu, setshowUpcomingOptionMenu] = useState(false);
        const [selectedUpcomingItemId, setselectedUpcomingItemId] = useState('');
        const [selectedCompletedAppointmentId, setselectedCompletedAppointmentId] = useState('');
        const [showCompletedOptionMenu, setshowCompletedOptionMenu] = useState(false);
    
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {tabs()}
        </View>
    )

    function tabs() {
        const renderScene = ({ route }) => {
            switch (route.key) {
                case 'first':
                    return upcomingAppointmentsInfo();
                case 'second':
                    return CompletedAppointments();
                case 'third':
                    return CancelledAppointments();
            }
        };
        return (
            <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.primaryColor, height: 2.0 }}
                    style={{ backgroundColor: Colors.whiteColor, elevation: 0.0 }}
                    renderLabel={({ route, focused }) => (
                        <Text
                            style={focused ? { ...Fonts.primaryColor16Bold } : { ...Fonts.lightGrayColor16Bold }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    );
}



function CompletedAppointments() {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { navigation.push('DriverAppointmentDetailScreen') }}
            style={styles.docorInfoWrapStyle}
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

           <View >
             <View>
              <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    Patient Name: {item.patientName}
                    </Text>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    Driver: {item.driver}
                    </Text>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                   Tranport Type: {item.type}
                </Text>
                 </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.appointmentDate}
                        </Text>
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        { }  •  { }
                    </Text>
                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.appointmentTime}
                        </Text>
                    </Text>
                </View>
           </View>    
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={CompletedAppointmentsList}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
        />
    );
}


function CancelledAppointments() {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { navigation.push('DriverAppointmentDetailScreen') }}
            style={styles.docorInfoWrapStyle}
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

           <View >
             <View>
              <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                 Patient Name: {item.patientName}
                    </Text>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    Driver: {item.driver}
                    </Text>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                   Tranport Type: {item.type}
                </Text>
                 </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.appointmentDate}
                        </Text>
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        { }  •  { }
                    </Text>
                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.appointmentTime}
                        </Text>
                    </Text>
                </View>
           </View>    
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={CancelledAppointmentsList}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
        />
    );
}

function upcomingAppointmentsInfo() {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { navigation.push('DriverAppointmentDetailScreen') }}
            style={styles.docorInfoWrapStyle}
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

           <View >
             <View>
              <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    Patient Name: {item.patientName}
                    </Text>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    Driver: {item.driver}
                    </Text>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                   Tranport Type: {item.type}
                </Text>
                 </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.appointmentDate}
                        </Text>
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        { }  •  { }
                    </Text>
                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.appointmentTime}
                        </Text>
                    </Text>
                </View>
           </View>    
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={upcomingAppointmentsList}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
        />
    );
}
    function noUpcomingAppointmentInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                    name='event-note'
                    color={Colors.lightGrayColor}
                    size={40}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor16SemiBold }}>
                    No Any Upcoming Appointments
                </Text>
            </View>
        )
    }

 
    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Tranport Bookings
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default StaffAppointmentScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    headerStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    docorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 8.0,
        paddingTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
   patientImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 4.5,
        width: width / 4.7,
        alignItems: 'center',
    },
   patientImageStyle: {
        width: (width / 4.7) - 15.0,
        height: '115%',
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
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
    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 3.0,
        alignItems: "center",
        justifyContent: "center",margin:10
      },
})