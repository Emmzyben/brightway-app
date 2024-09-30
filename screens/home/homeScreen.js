import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { showRating } from '../../components/showRatings';
import Banner from '../../components/banner';
import UserInfo from '../../components/userInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const banners = [
    {
        banner: require('../../assets/images/banner_bg.png'),
        desc: 'How it works!',
    },
    {
        banner: require('../../assets/images/banner_bg.png'),
        desc: 'Choose the service you want',
    },
    {
        banner: require('../../assets/images/banner_bg.png'),
        desc: 'Browse Providers available for your selected service',
    },
    {
        banner: require('../../assets/images/banner_bg.png'),
        desc: 'Select and book Provider',
    },
];

const categoryList = [
    {
        id: '1',
        categoryIcon: require('../../assets/images/category/cardiologist.png'),
        category: 'Cardiologist',
        bgColor: '#F3E5F5',
    },
    {
        id: '2',
        categoryIcon: require('../../assets/images/category/pediatrician.png'),
        category: 'Pediatrician',
        bgColor: '#E3F2FD',
    },
    {
        id: '3',
        categoryIcon: require('../../assets/images/category/pharmacist.png'),
        category: 'Pharmacist',
        bgColor: '#E0F7FA',
    },
    {
        id: '4',
        categoryIcon: require('../../assets/images/category/therapist.png'),
        category: 'Therapist',
        bgColor: '#E8F5E9',
    },
    {
        id: '5',
        categoryIcon: require('../../assets/images/category/dentist.png'),
        category: 'Dentist',
        bgColor: '#E0F2F1',
    },
];

const providerList = [
    {
        id: '1',
        providerName: 'Dr Richard Wood',
        booking: 'May 3, 10am',
        rating: 5.0,
        ProviderImage: [
            require('../../assets/images/doctors/doctor1.png'),
        ],
    },
    {
        id: '2',
        providerName: 'Dr Mile Wood',
        booking: 'May 6, 11am',
        rating: 5.0,
        ProviderImage: [
            require('../../assets/images/doctors/doctor2.png'),
        ],
    },
    {
        id: '3',
        providerName: 'Dr Richardson green',
        booking: 'May 30, 10am',
        rating: 5.0,
        ProviderImage: [
            require('../../assets/images/doctors/doctor3.png'),
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
const HomeScreen = ({ navigation }) => {

    const bannerRef = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            bannerRef.current.startAutoplay();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            bannerRef.current.stopAutoplay();
        });
        return unsubscribe;
    }, [navigation]);

    const [searchFieldFocus, setsearchFieldFocus] = useState(false);
    const [search, setsearch] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <UserInfo />
            <FlatList
                ListHeaderComponent={
                    <>
                        {searchField()}
                        <Banner banners={banners} bannerRef={bannerRef} />
                        {categoryInfo()}
                        {notifications()}
                        {UpcomingAppointments()}
                    </>
                }
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
            />
        </View>
    )

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

    function UpcomingAppointments() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('AppointmentDetail') }}
                style={styles.hospitalInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            {item.providerName}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.booking}
                        </Text>
                        {showRating({ number: item.rating })}
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
                    data={providerList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}
                />
            </View>
        )
    }

    function categoryInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('CategoryDetail') }}
                style={{ backgroundColor: item.bgColor, ...styles.categoryWrapStyle, }}
            >
                <Image
                    source={item.categoryIcon}
                    style={{ width: 36.0, height: 36.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding, }}>
                    {item.category}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 4.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                   Services
                </Text>
                <FlatList
                    data={categoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding + 10.0, }}
                />
            </View>
        )
    }

    function searchField() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingBottom: (width / 2.6) / 1.85 }}>
                <View style={styles.searchFieldWrapStyle}>
                    <MaterialIcons name="search" size={24} color={searchFieldFocus ? Colors.primaryColor : Colors.grayColor} />
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={Colors.grayColor}
                        style={styles.searchFieldStyle}
                        onFocus={() => { setsearchFieldFocus(true) }}
                        onBlur={() => { setsearchFieldFocus(false) }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        value={search}
                        onChangeText={(value) => { setsearch(value) }}
                    />
                </View>
            </View>
        )
    }
}

export default HomeScreen

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
        width: width / 7.0,
        height: 80.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginRight: Sizes.fixPadding,
        marginLeft:50,backgroundColor:'orange',
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
    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 3.0,
        alignItems: "center",
        justifyContent: "center",margin:10
      },
})