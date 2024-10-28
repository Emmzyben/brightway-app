import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect ,useCallback } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TabView, TabBar } from 'react-native-tab-view';
import { MaterialIcons } from '@expo/vector-icons';
import { CommonStyles } from '../../constants/styles';
import useFetchUserAppointments from '../../hooks/useFetchUserAppointments';
import Loader from '../../components/activityLoader';

const { width } = Dimensions.get('screen');

const AppointmentScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Completed' },
        { key: 'third', title: 'Cancelled' },
    ]);
    
    const { appointments, loading, fetchAppointments } = useFetchUserAppointments();
    useFocusEffect(
        useCallback(() => {
            fetchAppointments(); 
        }, [])
      );
    

      const upcomingAppointments = appointments.filter(item => ['pending', 'confirmed'].includes(item.status));
    const completedAppointments = appointments.filter(item => ['completed'].includes(item.status));
    const cancelledAppointments = appointments.filter(item => ['cancelled'].includes(item.status));

    const [showUpcomingOptionMenu, setshowUpcomingOptionMenu] = useState(false);
    const [selectedUpcomingItemId, setselectedUpcomingItemId] = useState('');
    const [selectedCompletedAppointmentId, setselectedCompletedAppointmentId] = useState('');
    const [showCompletedOptionMenu, setshowCompletedOptionMenu] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {loading ? <Loader isLoading={loading} />  : tabs()}
            {BookButton()}
        </View>
    )

    function tabs() {
        const renderScene = ({ route }) => {
            switch (route.key) {
                case 'first':
                    return upcomingAppointmentsInfo();
                case 'second':
                    return completedAppointmentsInfo();
                case 'third':
                    return cancelledAppointmentsInfo();
                default:
                    return null;
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
                            <Text style={focused ? { ...Fonts.primaryColor16Bold } : { ...Fonts.lightGrayColor16Bold }}>
                                {route.title}
                            </Text>
                        )}
                    />
                )}
            />
        );
    }

    function upcomingAppointmentsInfo() {
        if (upcomingAppointments.length === 0) {
            return noAppointmentsInfo('No Upcoming Appointments');
        }

        return (
            <FlatList
                data={upcomingAppointments}
                keyExtractor={item => `${item.id}`}
                renderItem={renderAppointmentItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
            />
        );
    }

    function completedAppointmentsInfo() {
        if (completedAppointments.length === 0) {
            return noAppointmentsInfo('No Completed Appointments');
        }

        return (
            <FlatList
                data={completedAppointments}
                keyExtractor={item => `${item.id}`}
                renderItem={renderAppointmentItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
            />
        );
    }

    function cancelledAppointmentsInfo() {
        if (cancelledAppointments.length === 0) {
            return noAppointmentsInfo('No Cancelled Appointments');
        }

        return (
            <FlatList
                data={cancelledAppointments}
                keyExtractor={item => `${item.id}`}
                renderItem={renderAppointmentItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
            />
        );
    }

    function renderAppointmentItem({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('AppointmentDetail', { appointmentId: item.appointmentId }) }}
                style={styles.docorInfoWrapStyle}
            >
                <View style={{ backgroundColor: item.bgColor, ...styles.doctorImageBackgroundStyle }}>
                    <Image
                        source={{ uri: item.providerProfile_picture }}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            {item.providerFirstName} {item.providerLastName}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.service}
                    </Text>
                    <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                       Status: {item.status}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                {item.bookDate}
                            </Text>
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            { }  •  { }
                        </Text>
                        <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                {item.bookTime}
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    function noAppointmentsInfo(message) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                    name='event-note'
                    color={Colors.lightGrayColor}
                    size={40}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor16SemiBold }}>
                    {message}
                </Text>
            </View>
        );
    }

    function BookButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Doctors') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    New Booking
                </Text>
            </TouchableOpacity>
        );
    }

    function header() {
        return (
            <View style={styles.headerStyle}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    My Bookings
                </Text>
            </View>
        );
    }
}

export default AppointmentScreen

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
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 4.5,
        width: width / 4.7,
        alignItems: 'center',
    },
    doctorImageStyle: {
        width: (width / 4.7) - 12.0,
        height: '115%',
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0, borderRadius: Sizes.fixPadding - 5.0,
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
});
