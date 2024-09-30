import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { showRating } from "../../components/showRatings";
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const aboutDoctors = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac sit ipsum eget sit. Eget nunc, ut in in ultricies.',
    'Mauris sem mauris urna ipsum quis est turpis. Pretium nec at elementum purus duis adipiscing interdum matt.Sed mi feugiat a neque dictum dictumst. Euismod eliit semper nisl malesuada duis sit sapien nisl.'
];

const doctorServicePlaces = [
    {
        id: '1',
        hospitalName: 'Mayo Clinic Scottsdale AZ',
        address: '83 Woodhedge Drive, Nottingham,',
    },
    {
        id: '2',
        hospitalName: 'Apple Hospital',
        address: '83 Woodhedge Drive, Nottingham,',
    },
];

const doctorSpecialities = [
    'Family Physician',
    'Geriatrician',
    'Family Nurse Practitioner',
    'Urgent Care Specialist'
];

const DoctorDetailScreen = ({ navigation }) => {

    const [inSave, setinSave] = useState(false);
    const [showSnackBar, setshowSnackBar] = useState(false);

    return (
        <View style={{ backgroundColor: Colors.bodyBackColor, flex: 1, }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
                    {doctorInfo()}
                    {aboutDoctor()}
                </ScrollView>
            </View>
            {bookAppintmentButton()}
            {snackbar()}
        </View>
    )

    function bookAppintmentButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('BookAppointment') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Book Appointment Now
                </Text>
            </TouchableOpacity>
        )
    }

    function specialistyInfo() {
        return (
            <View style={styles.specialityInfoWrapStyle}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Specialist in
                </Text>
                {
                    doctorSpecialities.map((item, index) => (
                        <Text
                            key={`${index}`}
                            numberOfLines={1}
                            style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}
                        >
                            •   {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function serviceAtInfo() {
        return (
            <View style={styles.serviceAtInfoWrapStyle}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Services at
                </Text>
                {
                    doctorServicePlaces.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{ marginBottom: Sizes.fixPadding }}
                        >
                            <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium }}>
                                {item.hospitalName}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons
                                    name='location-pin'
                                    color={Colors.grayColor}
                                    size={14}
                                />
                                <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                                    {item.address}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

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
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {aboutDoctorSort({ title: 'Patients', value: '1.08K' })}
                    {aboutDoctorSort({ title: 'Experience', value: '15 Years' })}
                    {aboutDoctorSort({ title: 'Review', value: '2.05K' })}
                </View> */}
            </View>
        )
    }

    function aboutDoctorSort({ title, value }) {
        return (
            <View style={{ alignItems: 'center', maxWidth: width / 3.5, }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                    {title}
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16Bold }}>
                    {value}
                </Text>
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

    function snackbar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => { setshowSnackBar(false) }}
                elevation={0.0}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {inSave ? 'Added To Saved' : 'Removed From Saved'}
                </Text>
            </Snackbar>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} onPress={() => { navigation.pop() }} />
               <Text>Provider detail</Text>
                <MaterialIcons
                    // name={inSave ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => {
                        setinSave(!inSave)
                        setshowSnackBar(true)
                    }}
                />
            </View>
        )
    }
}

export default DoctorDetailScreen

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
    serviceAtInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding
    },
    specialityInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding * 2.0,
    }
})