import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TabView, TabBar } from 'react-native-tab-view';
import { MaterialIcons } from '@expo/vector-icons';
import {CommonStyles } from '../../constants/styles'

const { width } = Dimensions.get('screen');

const upcomingAppointmentsList = [
    {
        id: '1',
       patientImage: require('../../assets/images/patients/patient3.png'),
        patientName: 'Mr. Ismail Sendi',
        description: 'Headache',
        appointmentDate: '12 Jan 2020',
        appointmentTime: '12:00 pm',
        bgColor: Colors.purpleColor,
    },
    {
        id: '2',
       patientImage: require('../../assets/images/patients/patient2.png'),
        patientName: 'Mrs. Barry George',
        description: 'Headache',
        appointmentDate: '15 Jan 2020',
        appointmentTime: '11:30 pm',
        bgColor: Colors.blueColor,
    },
    {
        id: '3',
       patientImage: require('../../assets/images/patients/patient7.png'),
        patientName: 'Mr. Howard Axe',
        description: 'Headache',
        appointmentDate: '17 Jan 2020',
        appointmentTime: '10:00 pm',
        bgColor: Colors.parrotColor,
    },
];

const CompletedAppointmentsList = [
    {
        id: '1',
       patientImage: require('../../assets/images/patients/patient4.png'),
        patientName: ' Sally Amsel',
        description: 'Headache',
        bgColor: Colors.greenColor,
        appointmentDate: '12 Jan 2020',
        appointmentTime: '11:30 pm',
    },
    {
        id: '2',
       patientImage: require('../../assets/images/patients/patient5.png'),
        patientName: ' Don Doman',
        description: 'Headache',
        bgColor: Colors.pitchColor,
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '3',
       patientImage: require('../../assets/images/patients/patient10.png'),
        patientName: ' Carol Pollack',
         description: 'Headache',
        bgColor: Colors.cyanColor,
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '4',
       patientImage: require('../../assets/images/patients/patient2.png'),
        patientName: ' Jean Bocage',
         description: 'Headache',
        bgColor: Colors.yellowColor,
        appointmentDate: '9 Jan 2020',
        appointmentTime: '10:00 pm',
    },
];
const CancelledAppointmentsList = [
    {
        id: '1',
        patientImage: require('../../assets/images/patients/patient7.png'),
        patientName: ' Sallie Amsel',
         description: 'Headache',
        bgColor: Colors.greenColor,
        appointmentDate: '12 Jan 2020',
        appointmentTime: '11:30 pm',
    },
    {
        id: '2',
      patientImage: require('../../assets/images/patients/patient8.png'),
        patientName: ' Don Maga',
         description: 'Headache',
        bgColor: Colors.pitchColor,
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '3',
      patientImage: require('../../assets/images/patients/patient9.png'),
        patientName: ' Carol Pollack',
         description: 'Headache',
        bgColor: Colors.cyanColor,
        appointmentDate: '10 Jan 2020',
        appointmentTime: '10:00 pm',
    },
    {
        id: '4',
     patientImage: require('../../assets/images/patients/patient5.png'),
        patientName: ' Jean Bocage',
         description: 'Headache',
        bgColor: Colors.yellowColor,
        appointmentDate: '9 Jan 2020',
        appointmentTime: '10:00 pm',
    },
];

const ProviderAppointmentScreen = ({ navigation }) => {

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
            onPress={() => { navigation.push('ProviderAppointmentDetail') }}
            style={styles.docorInfoWrapStyle}
        >
            <View style={{ backgroundColor: item.bgColor, ...styles.patientImageBackgroundStyle }}>
                <Image
                    source={item.patientImage}
                    style={styles.patientImageStyle}
                />
            </View>
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        {item.patientName}
                    </Text>
               
                </View>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                    {item.description}
                </Text>
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
            onPress={() => { navigation.push('ProviderAppointmentDetail') }}
            style={styles.docorInfoWrapStyle}
        >
            <View style={{ backgroundColor: item.bgColor, ...styles.patientImageBackgroundStyle }}>
                <Image
                    source={item.patientImage}
                    style={styles.patientImageStyle}
                />
            </View>
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        {item.patientName}
                    </Text>
                 
                </View>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                    {item.description}
                </Text>
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
            onPress={() => { navigation.push('ProviderAppointmentDetail') }}
            style={styles.docorInfoWrapStyle}
        >
            <View style={{ backgroundColor: item.bgColor, ...styles.patientImageBackgroundStyle }}>
                <Image
                    source={item.patientImage}
                    style={styles.patientImageStyle}
                />
            </View>
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        {item.patientName}
                    </Text>
                  
                </View>
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                    {item.description}
                </Text>
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
            <View style={styles.headerStyle}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                   My Bookings
                </Text>
            </View>
        )
    }
}

export default ProviderAppointmentScreen

const styles = StyleSheet.create({
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
        height: '100%',
        resizeMode: 'fill',
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
})