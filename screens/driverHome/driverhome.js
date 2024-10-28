import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect,useCallback} from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { showRating } from '../../components/showRatings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UpperTab1 from '../../components/upperTab1';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get('window');
import useFetchUserAppointments from '../../hooks/useFetchUpcomingtrips';
import useFetchUserDetails from '../../hooks/useFetchUserDetails';



const userList = [
    {
        id: '1',
        providerName: 'Mrs Richard Wood',
        booking: 'May 3, 10am',
        type:"Drop Off",
        ProviderImage: [
            require('../../assets/images/users/user8.png'),
        ],
    },
    {
        id: '2',
        providerName: 'Mrs Mile Wood',
        booking: 'May 6, 11am',
        type:"Drop Off",
        ProviderImage: [
            require('../../assets/images/users/user5.png'),
        ],
    },
    {
        id: '3',
        providerName: 'Mr Richardson green',
        booking: 'May 30, 10am',
        type:"Pickup",
        ProviderImage: [
            require('../../assets/images/users/user7.png'),
        ],
    },
];

const pendingNotifications= [
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
const DriverHome = ({ navigation }) => {
    const { appointments } = useFetchUserAppointments();
    const { userDetails, error } = useFetchUserDetails();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
        services:'',
        bio:'',
        profile_picture:''
    });
    useEffect(() => {
        if (userDetails) {
            setUserInfo({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                mobileNumber: userDetails.mobileNumber,
                email: userDetails.email,
                bio:userDetails.bio,
                password: '',
                services: userDetails.services,
                profile_picture: userDetails.profile_picture,
            });
        }
    }, [userDetails]);

  
    
const upcomingAppointments = appointments.filter(
  (item) => item.status === 'pending' || item.status === 'confirmed'
);

  

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <UpperTab1/>
            <FlatList
                ListHeaderComponent={
                    <>
                       {driverinfo()}
                        {notifications()}
                        {UpcomingTrips()}
                    </>
                }
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
            />
        </View>
    )
  
    
    function driverinfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() => { navigation.push('DoctorReviews') }}
                style={styles.doctorInfoWrapStyle}
            >
                <View style={{ ...styles.doctorImageBackgroundStyle, }}>
                <Image
                        source={{ uri: userInfo.profile_picture}}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                    {userInfo.firstName}  {userInfo.lastName} 
                    </Text>
                    <Text numberOfLines={1} style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.grayColor15Medium ,color:'green'}}>
                        Online
                    </Text>
                  
                </View>
            </TouchableOpacity>
        )
    }
    function notifications() {
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
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            {item.notification}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.time}
                        </Text>
                    </View>
                  
                </View>
               
               
            </TouchableOpacity>
        )
        return (
            <View>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, flex: 1, }}>
                       Pending Notifications
                    </Text>
                    <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Notifications') }}
            >
            <Text>View all</Text>
            </TouchableOpacity>
              </View>
                <FlatList
                    data={pendingNotifications}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}
                />
            </View>
        )
    }
  
    function UpcomingTrips() {
        if (upcomingAppointments.length === 0) {
            return noAppointmentsInfo('No Upcoming Trips');
        }
    
        return (
            <>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, flex: 1 }}>
                        Upcoming Trips
                    </Text>
                </View>
    
                <FlatList
                    data={upcomingAppointments}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                />
            </>
        );
    }
    function renderItem({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('AppointmentDetail', { appointmentId: item.appointmentId }) }}
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
                            name="notifications"
                            size={20}
                            color='rgba(58, 155, 195, 0.80)'
                        />
                    </View>
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            {item.patient_firstName} {item.patient_lastName}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.date} {item.time}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                           Status: {item.status}
                        </Text>
                    </View>
                    <View style={{ flex: 0.35 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Image
                                source={{ uri: item.patientProfilePicture}}
                                style={styles.hospitalImagesStyle}
                            />
                        </ScrollView>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
  
    function noAppointmentsInfo(message) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center',marginBottom:30 }}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, flex: 1 }}>
                        Upcoming Trips
                    </Text>
                </View>
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

  

 
}

export default DriverHome

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.bodyBackColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    categoryWrapStyle: {
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        marginRight: Sizes.fixPadding + 5.0,
        minWidth: 100.0,
    },
    hospitalImagesStyle: {
        alignSelf: 'center',
        width: width / 4.0,
        height: 70.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginRight: Sizes.fixPadding,
    },
    hospitalLocationAndCallInfoWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Sizes.fixPadding * 2.0
    },
    hospitalInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding,
    },
    searchFieldStyle: {
        height: 20.0,
        flex: 1,
        ...Fonts.blackColor14Medium,
        marginLeft: Sizes.fixPadding
    },
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: 130,
        width: width / 3.5,
        alignItems: 'center',
        backgroundColor: Colors.purpleColor,
    },
    doctorImageStyle: {
        width: (width / 3.5) - 15.0,
        height: '100%',
        resizeMode: 'fill',
        position: 'absolute',
        bottom: 0.0,
    },
    doctorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 3.0,
        alignItems: "center",
        justifyContent: "center",marginRight:10
      },
})