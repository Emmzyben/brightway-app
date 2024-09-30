import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { showRating } from '../../components/showRatings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UpperTab from '../../components/upperTab';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get('window');
const aboutDoctors = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac sit ipsum eget sit. Eget nunc, ut in in ultricies.',
    'Mauris sem mauris urna ipsum quis est turpis. Pretium nec at elementum purus duis adipiscing interdum matt.Sed mi feugiat a neque dictum dictumst. Euismod eliit semper nisl malesuada duis sit sapien nisl.'
];




const userList = [
    {
        id: '1',
        providerName: 'Mrs Richard Wood',
        booking: 'May 3, 10am',
        ProviderImage: [
            require('../../assets/images/users/user1.png'),
        ],
    },
    {
        id: '2',
        providerName: 'Mrs Mile Wood',
        booking: 'May 6, 11am',
        ProviderImage: [
            require('../../assets/images/users/user2.png'),
        ],
    },
    {
        id: '3',
        providerName: 'Mrs Richardson green',
        booking: 'May 30, 10am',
        ProviderImage: [
            require('../../assets/images/users/user3.png'),
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
const ProviderHome = ({ navigation }) => {


    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
          <UpperTab/>  
          <FlatList
                ListHeaderComponent={
                    <>
                       {doctorInfo()}
                        {aboutDoctor()}
                        {notifications()}
                        {UpcomingAppointments()}
                    </>
                }
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
            />
            
        </View>
    )
    function aboutDoctor() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold, marginBottom: Sizes.fixPadding + 5.0, }}>
                   Provider Bio
                </Text>
                {
                    aboutDoctors.map((item, index) => (
                        <Text key={`${index}`}
                            style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}
                        >
                            {item}
                        </Text>
                    ))
                }
               
            </View>
        )
    }

    
    function doctorInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() => { navigation.push('DoctorReviews') }}
                style={styles.doctorInfoWrapStyle}
            >
                <View style={{ ...styles.doctorImageBackgroundStyle, }}>
                    <Image
                        source={require('../../assets/images/doctors/doctor1.png')}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                        Dr.	Ismail Sendi
                    </Text>
                    <Text numberOfLines={1} style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.grayColor15Medium }}>
                        Gastroenterologist 
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 8.0, flexDirection: 'row', alignItems: 'center' }}>
                        {showRating({ number: 4.0 })}
                        
                    </View>
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
                  color='orange'
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

    function UpcomingAppointments() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('ProviderAppointmentDetail') }}
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
                  name="timer"
                  size={20}
                  color='rgba(58, 155, 195, 0.80)'
                />
              </View>
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            {item.providerName}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.booking}
                        </Text>
                    </View>
                    <View style={{ flex: 0.35, }}>
                        <ScrollView
                            onPointerEnter={() => { }}
                            horizontal showsHorizontalScrollIndicator={false}>
                            {
                                item.ProviderImage.map((image, index) => (
                                    <Image
                                        key={`${index}`}
                                        source={image}
                                        style={styles.hospitalImagesStyle}
                                    />
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
               
               
            </TouchableOpacity>
        )
        return (
            <View>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, flex: 1, }}>
                        Upcoming appointments
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
        )
    }

  

 
}

export default ProviderHome

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
        height: 50.0,
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
        height: 110,
        width: width / 3.5,
        alignItems: 'center',
        backgroundColor: Colors.purpleColor,
    },
    doctorImageStyle: {
        width: (width / 3.5) - 15.0,
        height: '125%',
        resizeMode: 'stretch',
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
    },
    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 3.0,
        alignItems: "center",
        justifyContent: "center",margin:10
      },
})