import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';
import useFetchUserByEmailAndUsername from '../../hooks/useFetchUserByEmailAndUsername';

const { width } = Dimensions.get('window');

const DoctorDetailScreen = ({ navigation, route }) => {
    const { email, username } = route.params;
    const { user, loading, error } = useFetchUserByEmailAndUsername(email, username);

    const [inSave, setinSave] = useState(false);
    const [showSnackBar, setshowSnackBar] = useState(false);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: Colors.bodyBackColor, flex: 1 }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
                    {doctorInfo()}
                    {Detail()}
                    {aboutDoctor()}
                </ScrollView>
            </View>
            {bookAppointmentButton()}
            {snackbar()}
        </View>
    );

   

    function bookAppointmentButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (user) {
                        navigation.push('BookAppointment', { email: user.email, username: user.username });
                    }
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Book Appointment Now
                </Text>
            </TouchableOpacity>
        );
    }

    function aboutDoctor() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.blackColor18SemiBold, marginBottom: Sizes.fixPadding + 5.0 }}>
                    Contact
                </Text>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.grayColor17Medium }}>
                    Email: {user?.email || 'N/A'}
                </Text>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.grayColor17Medium }}>
                    Phone: {user?.mobileNumber || 'N/A'}
                </Text>
            </View>
        );
    }

    function Detail() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginBottom: 10 }}>
                <Text style={{ ...Fonts.blackColor18SemiBold, marginBottom: Sizes.fixPadding + 5.0 }}>
                    Provider Bio
                </Text>
                <Text style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}>
                    {user?.bio || 'No bio available.'}
                </Text>
            </View>
        );
    }

    function doctorInfo() {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.doctorInfoWrapStyle}>
                <View style={styles.doctorImageBackgroundStyle}>
                    <Image
                        source={user?.profile_picture ? { uri: user.profile_picture } : require('../../assets/images/user.png')}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                        {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'No name available'}
                    </Text>
                    <Text numberOfLines={1} style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.grayColor15Medium }}>
                        {user?.services || 'No services available'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    function snackbar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setshowSnackBar(false)}
                elevation={0.0}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {inSave ? 'Added To Saved' : 'Removed From Saved'}
                </Text>
            </Snackbar>
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} onPress={() => navigation.pop()} />
                <Text>Provider Detail</Text>
                <MaterialIcons
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => {
                        setinSave(!inSave);
                        setshowSnackBar(true);
                    }}
                />
            </View>
        );
    }
};

export default DoctorDetailScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
    },
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: 110,
        width: width / 3.5,
        alignItems: 'center',
        backgroundColor: Colors.purpleColor,
    },
    doctorImageStyle: {
        height: 110,
        width: width / 3.5,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
        borderRadius: Sizes.fixPadding - 5.0,
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
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding * 2.0,
    },
});
