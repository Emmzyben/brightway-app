import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect ,useCallback } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TabView, TabBar } from 'react-native-tab-view';
import { MaterialIcons } from '@expo/vector-icons';
import { CommonStyles } from '../../constants/styles';
import useFetchAppointments from '../../hooks/useFetchAppointments';
import Loader from '../../components/activityLoader';
import { BackHandler } from 'react-native';
const { width } = Dimensions.get('screen');

const StaffAppointmentScreen = ({ navigation }) => {
    const backAction = () => {
        navigation.push('StaffBottomTabBar'); 
        return true; 
      };
    
      useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    
    
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Completed' },
        { key: 'third', title: 'Cancelled' },
    ]);
    
    const { appointments, loading, fetchAppointments } = useFetchAppointments();
    useFocusEffect(
        useCallback(() => {
            fetchAppointments(); 
        }, [])
      );
    

      const upcomingAppointments = appointments.filter(item => ['pending', 'confirmed'].includes(item.status));
    const completedAppointments = appointments.filter(item => ['completed'].includes(item.status));
    const cancelledAppointments = appointments.filter(item => ['cancelled'].includes(item.status));

   

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {loading ? <Loader isLoading={loading} />  : tabs()}
           
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
            return noAppointmentsInfo('No Upcoming Bookings');
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
            return noAppointmentsInfo('No Completed Bookings');
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
            return noAppointmentsInfo('No Cancelled Bookings');
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
                onPress={() => { navigation.push('StaffAppointmentDetailScreen', { appointmentId: item.id }) }}
                style={styles.docorInfoWrapStyle}
            >
                <View style={{ backgroundColor: item.bgColor, ...styles.doctorImageBackgroundStyle }}>
                    <Image
                        source={{ uri: item.profile_picture }}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                          Driver :  {item.driverName} 
                        </Text>
                    </View>
                 
                    <View >
                        <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                              Date:  {item.date}
                            </Text>
                        </Text>
                       
                        <Text numberOfLines={1} style={{ maxWidth: width / 3.45 }}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                             Time:   {item.time}
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

 
    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Tranport Bookings
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { 
                    navigation.push('StaffBottomTabBar'); 
                }}  />
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
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 5.5,
        width: width / 4.7,
        alignItems: 'center',
    },
    doctorImageStyle: {
        width: (width / 4.7) - 12.0,
        height: '100%',
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
