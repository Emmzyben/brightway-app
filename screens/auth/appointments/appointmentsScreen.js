import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { TabView, TabBar } from 'react-native-tab-view';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const todayAppointmentsList = [
    {
        id: '1',
        patientImage: require('../../assets/images/patients/patient1.png'),
        patientName: 'Samantha Smith',
        appointmentReason: 'Stomach and abdominal pain',
        appintmnetTime: '10:00 am',
    },
    {
        id: '2',
        patientImage: require('../../assets/images/patients/patient2.png'),
        patientName: 'Rochel Foose',
        appointmentReason: 'Earache, or ear infection',
        appintmnetTime: '10:30 am',
    },
    {
        id: '3',
        patientImage: require('../../assets/images/patients/patient3.png'),
        patientName: 'Willard Purnell',
        appointmentReason: 'Labored or difficult breathing',
        appintmnetTime: '01:00 pm',
    },
    {
        id: '4',
        patientImage: require('../../assets/images/patients/patient4.png'),
        patientName: 'Roselle Ehrman',
        appointmentReason: 'Headache, pain in head',
        appintmnetTime: '01:30 pm',
    },
    {
        id: '5',
        patientImage: require('../../assets/images/patients/patient5.png'),
        patientName: 'Rodolfo Goode',
        appointmentReason: 'Fever, Vomiting, Cough',
        appintmnetTime: '02:00 pm',
    }
];

const tomorrowAppointmentsList = [
    {
        id: '1',
        patientImage: require('../../assets/images/patients/patient6.png'),
        patientName: 'Merrill Kervin',
        appointmentReason: 'Depression',
        appintmnetTime: '10:00 am',
    },
    {
        id: '2',
        patientImage: require('../../assets/images/patients/patient7.png'),
        patientName: 'Tynisha Obey',
        appointmentReason: 'Chest pain and related symptoms',
        appintmnetTime: '10:30 am',
    },
    {
        id: '3',
        patientImage: require('../../assets/images/patients/patient8.png'),
        patientName: 'Tanner Stafford',
        appointmentReason: 'Headache, pain in head',
        appintmnetTime: '01:00 pm',
    },
    {
        id: '4',
        patientImage: require('../../assets/images/patients/patient9.png'),
        patientName: 'Daryl Nehls',
        appointmentReason: 'Vomiting, Fever',
        appintmnetTime: '01:30 pm',
    },
    {
        id: '5',
        patientImage: require('../../assets/images/patients/patient10.png'),
        patientName: 'Kylee Danford',
        appointmentReason: 'Knee injury',
        appintmnetTime: '02:00 pm',
    },
];

const AppointmentsScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Today' },
        { key: 'second', title: 'Tomorrow' },
    ]);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {tabs()}
        </View>
    )

    function tomorrowAppointmentsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.appointmentWrapStyle}>
                <Image
                    source={item.patientImage}
                    style={styles.patientImageStyle}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 8.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            {item.patientName}
                        </Text>
                        <MaterialIcons
                            name='more-vert'
                            color={Colors.primaryColor}
                            size={20}
                        />
                    </View>
                    <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}>
                        {item.appointmentReason}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                            {item.appintmnetTime}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name='call'
                                color={Colors.primaryColor}
                                size={16}
                                style={{ marginRight: Sizes.fixPadding + 5.0 }}
                            />
                            <MaterialCommunityIcons
                                name="message-processing"
                                size={17}
                                color={Colors.primaryColor}
                                onPress={() => { navigation.push('ChatWithPatient') }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={tomorrowAppointmentsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function todayAppointmentsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.appointmentWrapStyle}>
                <Image
                    source={item.patientImage}
                    style={styles.patientImageStyle}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 8.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            {item.patientName}
                        </Text>
                        <MaterialIcons
                            name='more-vert'
                            color={Colors.primaryColor}
                            size={20}
                        />
                    </View>
                    <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}>
                        {item.appointmentReason}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                            {item.appintmnetTime}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name='call'
                                color={Colors.primaryColor}
                                size={16}
                                style={{ marginRight: Sizes.fixPadding + 5.0 }}
                            />
                            <MaterialCommunityIcons
                                name="message-processing"
                                size={17}
                                color={Colors.primaryColor}
                                onPress={() => { navigation.push('ChatWithPatient') }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={todayAppointmentsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function tabs() {
        const renderScene = ({ route, jumpTo }) => {
            switch (route.key) {
                case 'first':
                    return todayAppointmentsInfo()
                case 'second':
                    return tomorrowAppointmentsInfo()
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
                        pressColor={Colors.whiteColor}
                        renderLabel={({ route, focused }) => (
                            <Text style={focused ? { ...Fonts.primaryColor16Bold } : { ...Fonts.lightGrayColor16Bold }}>
                                {route.title}
                            </Text>
                        )}
                    />
                )}
            />
        )
    }

    function header() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor20Bold }}>
                    My Appointments
                </Text>
            </View>
        )
    }
}

export default AppointmentsScreen

const styles = StyleSheet.create({
    patientImageStyle: {
        width: width / 4.8,
        height: width / 4.8,
        borderRadius: Sizes.fixPadding - 5.0,
        minHeight: 80.0,
    },
    appointmentWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0,
        marginBottom: Sizes.fixPadding,
    }
})