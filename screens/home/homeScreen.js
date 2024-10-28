import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Dimensions } from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';

import Banner from '../../components/banner';
import UserInfo from '../../components/userInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGetServices from '../../hooks/useGetServices';
import useFetchUserAppointments from '../../hooks/useFetchUserAppointments';


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

const images = [
    require('../../assets/images/category/cardiologist.png'),
    require('../../assets/images/category/pediatrician.png'),
    require('../../assets/images/category/pharmacist.png'),
    require('../../assets/images/category/therapist.png'),
    require('../../assets/images/category/dentist.png'),
];
const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};
const getRandomBackgroundColor = () => {
    const colors = ['#F3E5F5', '#E3F2FD', '#E0F7FA', '#E8F5E9', '#E0F2F1'];
    return colors[Math.floor(Math.random() * colors.length)];
};


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
    const { services, loading, error } = useGetServices();
    const bannerRef = useRef();
    const { appointments, fetchAppointments } = useFetchUserAppointments();
    const [allloading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchAppointments();
            const timer = setTimeout(() => setLoading(false), 10000);
            
            return () => clearTimeout(timer);
        }
    }, [isFocused]);

    const upcomingAppointments = appointments.filter(item => ['pending', 'confirmed'].includes(item.status));

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (bannerRef.current) {
                bannerRef.current.startAutoplay();
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            if (bannerRef.current) {
                bannerRef.current.stopAutoplay();
            }
        });
        return unsubscribe;
    }, [navigation]);

    const [searchFieldFocus, setSearchFieldFocus] = useState(false);
    const [search, setSearch] = useState('');
    const handleSearchSubmit = () => {
        if (search.trim()) {
            navigation.navigate('SearchCategoryDetailScreen', { name: search.trim() });
            setSearch('');
        }
    };


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
                        {upcomingAppointmentsInfo()}
                    </>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2 }}
            />
        </View>
    );

    function upcomingAppointmentsInfo() {
        if (upcomingAppointments.length === 0) {
            return noAppointmentsInfo('No Upcoming Appointments');
        }
    
        return (
            <>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, flex: 1 }}>
                        Upcoming appointments
                    </Text>
                </View>

                <FlatList
    data={upcomingAppointments}
    initialNumToRender={5} // Limit initial render
    removeClippedSubviews={true}
    keyExtractor={item => `${item.id}`}
    renderItem={renderAppointmentItem}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
/>

            </>
        );
    }

    function renderAppointmentItem({ item }) {
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
                            {item.providerFirstName} {item.providerLastName}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.bookDate} {item.bookTime}
                        </Text>
                    </View>
                    <View style={{ flex: 0.35 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Image
                                source={{ uri: item.providerProfile_picture }}
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
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' ,marginBottom:30 }}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, flex: 1 }}>
                        Upcoming appointments
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

    function notifications() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Notifications') }}
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
                    <Text style={{ ...Fonts.blackColor18SemiBold, flex: 1 }}>
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
                    removeClippedSubviews={true}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
                />
            </View>
        );
    }

    function categoryInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('CategoryDetail', { item }) }}
                    style={{ backgroundColor: getRandomBackgroundColor(), ...styles.categoryWrapStyle }}
                >
                    <Image
                        source={getRandomImage()} 
                        style={{ width: 36.0, height: 36.0, resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding }}>
                        {item}
                    </Text>
                </TouchableOpacity>
            );
        };
        
        return (
            <View style={{ marginTop: Sizes.fixPadding * 4.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Services
                </Text>
                <FlatList
                    data={services}
                    removeClippedSubviews={true} 
                    keyExtractor={(item, index) => `${index}`} 
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding + 10.0 }}
                    ListEmptyComponent={() => (
                        <View style={{ padding: Sizes.fixPadding * 2, alignItems: 'center' }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>No services available.</Text>
                        </View>
                    )}
                />
            </View>
        );
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
                        onFocus={() => setSearchFieldFocus(true)}
                        onBlur={() => setSearchFieldFocus(false)}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        onSubmitEditing={handleSearchSubmit} 
                        returnKeyType="search"
                    />
                </View>
            </View>
        );
    }
}

export default HomeScreen;

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
        marginLeft: 50,
        backgroundColor: 'orange',
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
        borderRadius: Sizes.fixPadding, 
        elevation: 2,
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
        justifyContent: "center",
        margin: 10
    },
});
