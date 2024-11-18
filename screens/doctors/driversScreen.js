import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';
import Loader from '../../components/activityLoader';
import useFetchDrivers from '../../hooks/useFetchDrivers';

const { width } = Dimensions.get('window');

const DriversScreen = ({ navigation }) => {
    const { drivers, loading, error } = useFetchDrivers();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {loading ? <Loader isLoading={loading} /> : error ? <Text style={styles.errorText}>{error}</Text> : <Drivers />}
            </View>
        </View>
    );

    function Drivers() {
        if (drivers.length === 0) {
            return (
                <View style={styles.noDriversFoundContainer}>
                    <Text style={styles.noDriversFoundText}>No drivers found</Text>
                </View>
            );
        }

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { 
    console.log("Navigating to BookDriver with driverId:", item.id);
    navigation.push('BookDriver', { 
        driverId: item.id, 
        driverName: `${item.firstName} ${item.lastName}`, 
        profile_picture: item.profile_picture 
    }); 
}}


                style={styles.driverInfoWrapStyle}
            >
                <View style={{ backgroundColor: Colors.lightGray, ...styles.driverImageBackgroundStyle }}>
                    <Image
                        source={item.profile_picture ? { uri: item.profile_picture } : require('../../assets/images/user.png')}
                        style={styles.driverImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            {item.firstName} {item.lastName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
        

        return (
            <FlatList
                data={drivers}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Drivers
                </Text>
                <TouchableOpacity onPress={() => { navigation.push('StaffAppointmentScreen') }}>
                    <Text style={{ fontSize: 17 }}>All Bookings</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default DriversScreen;

const styles = StyleSheet.create({
    driverInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 8.0,
        paddingTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',marginTop:2,
    },
    driverImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 4.5,
        width: width / 4.7,
        alignItems: 'center',
    },
    driverImageStyle: {
        width: (width / 4.7) - 15.0,
        height: '90%',
        resizeMode: 'cover',
        position: 'absolute',
        bottom: 0.0,borderRadius: Sizes.fixPadding - 5.0,
    },
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding * 2.0,
    },
    noDriversFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDriversFoundText: {
        ...Fonts.blackColor16Medium,
        color: Colors.grayColor,
    },
    errorText: {
        ...Fonts.blackColor16Medium,
        color: Colors.redColor,
        textAlign: 'center',
        marginTop: 20,
    },
});
