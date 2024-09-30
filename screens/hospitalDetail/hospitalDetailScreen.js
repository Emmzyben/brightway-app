import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import MapView, { Marker } from 'react-native-maps';
import { showRating } from '../../components/showRatings';
import { ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const { height, width } = Dimensions.get('window');

const dummyDoctorsList1 = [
    {
        id: '1',
        doctorImage: require('../../assets/images/doctors/doctor1.png'),
        doctorName: 'Dr. Ismail Sendi',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Gastroenterologist at Apple Hospital',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.purpleColor,
    },
    {
        id: '2',
        doctorImage: require('../../assets/images/doctors/doctor2.png'),
        doctorName: 'Dr. Barry George',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Neurologist at Mayo Clinic',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.blueColor,
    },
    {
        id: '3',
        doctorImage: require('../../assets/images/doctors/doctor3.png'),
        doctorName: 'Dr. Carol Pollack',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Nephrologist at Apple Hospital',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.cyanColor,
    },
    {
        id: '4',
        doctorImage: require('../../assets/images/doctors/doctor4.png'),
        doctorName: 'Dr. Howard Axe',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Gynecologist at Mayo Clinic',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.parrotColor,
    },
    {
        id: '5',
        doctorImage: require('../../assets/images/doctors/doctor5.png'),
        doctorName: 'Dr. Sally Amsel',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Family Physician at Apple Hospital',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.greenColor,
    },
    {
        id: '6',
        doctorImage: require('../../assets/images/doctors/doctor6.png'),
        doctorName: 'Dr. Jean Bocage',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Endocrinologist at Mayo Clinic',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.yellowColor,
    },
    {
        id: '7',
        doctorImage: require('../../assets/images/doctors/doctor7.png'),
        doctorName: 'Dr. Don Doman',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Cardiologist at Apple Hospital',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.pitchColor,
    },
];

const dummyDoctorsList2 = [
    {
        id: '1',
        doctorImage: require('../../assets/images/doctors/doctor1.png'),
        doctorName: 'Dr. Ismail Sendi',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Gastroenterologist at Apple Hospital',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.purpleColor,
    },
    {
        id: '2',
        doctorImage: require('../../assets/images/doctors/doctor2.png'),
        doctorName: 'Dr. Barry George',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Neurologist at Mayo Clinic',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.blueColor,
    },
    {
        id: '3',
        doctorImage: require('../../assets/images/doctors/doctor6.png'),
        doctorName: 'Dr. Jean Bocage',
        rating: 4.0,
        ratingCount: 152,
        hospitalNameWithPost: 'Endocrinologist at Mayo Clinic',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.yellowColor,
    },
];

const departmentList = [
    {
        id: '1',
        departmentName: 'Oncology Department',
        doctors: dummyDoctorsList1,
        isOpen: false,
    },
    {
        id: '2',
        departmentName: 'Cardiology Department',
        doctors: dummyDoctorsList2,
        isOpen: false,
    },
    {
        id: '3',
        departmentName: 'Outpatient Department (OPD)',
        doctors: dummyDoctorsList2,
        isOpen: false,
    },
    {
        id: '4',
        departmentName: 'Radiology Department',
        doctors: dummyDoctorsList1,
        isOpen: false,
    },
    {
        id: '5',
        departmentName: 'Rehabilitation Department',
        doctors: dummyDoctorsList2,
        isOpen: false,
    },
];

const aboutHospitals = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac sit ipsum eget sit. Eget nunc, ut in in ultricies.',
    'Mauris sem mauris urna ipsum quis est turpis. Pretium nec at elementum purus duis adipiscing interdum matt.Sed mi feugiat a neque dictum dictumst.Euismod eliit semper nisl malesuada duis sit sapien nisl.'
];

const hospitalFacilitiesList = [
    'OPD (Allopathy & Homeopathy)',
    'Dental facility',
    'Emergency Ward',
    'Minor OT/ Dressing Room',
    'Physiotherapy',
    'Laboratory services',
    'ECG Services',
];

const HospitalDetailScreen = ({ navigation }) => {

    const [selectedTabIndex, setselectedTabIndex] = useState(0);
    const [departments, setdepartments] = useState(departmentList);
    const [inSaved, setinSaved] = useState(false);
    const [showSnackBar, setshowSnackBar] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <CollapsibleToolbar
                renderContent={pageContent}
                renderNavBar={header}
                renderToolBar={hospitalImage}
                collapsedNavBarBackgroundColor={Colors.primaryColor}
                translucentStatusBar={false}
                toolBarHeight={height / 3.2}
                showsVerticalScrollIndicator={false}
            />
            {callNowButton()}
            {snackBar()}
        </View>
    )

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                elevation={0.0}
                onDismiss={() => { setshowSnackBar(false) }}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {inSaved ? 'Added To Saved' : 'Removed From Saved'}
                </Text>
            </Snackbar>
        )
    }

    function callNowButton() {
        return (
            <View style={styles.buttonStyle}>
                <MaterialIcons
                    name='call'
                    color={Colors.whiteColor}
                    size={18}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor17Bold }}>
                    Call Now
                </Text>
            </View >
        )
    }

    function hospitalImage() {
        return (
            <Image
                source={require('../../assets/images/hospitals/hospital11.png')}
                style={{ width: '100%', height: height / 3.2 }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} onPress={() => navigation.pop()} />
                <MaterialIcons
                    name={inSaved ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => {
                        setinSaved(!inSaved)
                        setshowSnackBar(true)
                    }}
                />
            </View>
        )
    }

    function pageContent() {
        return (
            <View style={{ flex: 1, }}>
                {tabBar()}
                {
                    selectedTabIndex == 0
                        ?
                        aboutHospitalInfo()
                        :
                        departmentInfo()
                }
            </View>
        )
    }

    function updateDepartments({ id }) {
        const copyDepartments = departments;
        const newDepartments = copyDepartments.map((item) => {
            if (item.id == id) {
                return { ...item, isOpen: !item.isOpen }
            }
            else {
                return item
            }
        })
        setdepartments(newDepartments);
    }

    function departmentInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                {
                    departments.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{ backgroundColor: Colors.whiteColor, marginBottom: Sizes.fixPadding, }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { updateDepartments({ id: item.id }) }}
                                style={{ flexDirection: 'row', alignItems: 'center', margin: Sizes.fixPadding * 2.0 }}
                            >
                                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold, flex: 1, }}>
                                    {item.departmentName}
                                </Text>
                                <MaterialIcons
                                    name={item.isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                    color={Colors.primaryColor}
                                    size={24}
                                    style={{ marginLeft: Sizes.fixPadding }}
                                />
                            </TouchableOpacity>
                            {
                                item.isOpen
                                    ?
                                    <View style={{ height: height / 2.5 }}>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            {
                                                item.doctors.map((doctor) => {
                                                    return (
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() => { navigation.push('DoctorDetail') }}
                                                            key={`${doctor.id}`}
                                                            style={styles.docorInfoWrapStyle}
                                                        >
                                                            <View style={{ backgroundColor: doctor.bgColor, ...styles.doctorImageBackgroundStyle, }}>
                                                                <Image
                                                                    source={doctor.doctorImage}
                                                                    style={styles.doctorImageStyle}
                                                                />
                                                            </View>
                                                            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, }}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                                                                        {doctor.doctorName}
                                                                    </Text>
                                                                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}>
                                                                        {showRating({ number: doctor.rating })}
                                                                        <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor11SemiBold }}>
                                                                            ({doctor.ratingCount})
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                                <Text style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                                                                    {doctor.hospitalNameWithPost}
                                                                </Text>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45, }} >
                                                                        <Text style={{ ...Fonts.grayColor14Medium }}>
                                                                            Exp: { }
                                                                        </Text>
                                                                        <Text style={{ ...Fonts.blackColor14Medium }}>
                                                                            {doctor.experienceInYear} years
                                                                        </Text>
                                                                    </Text>
                                                                    <Text style={{ ...Fonts.grayColor14Medium, color: Colors.lightGrayColor }}>
                                                                        { }  •  { }
                                                                    </Text>
                                                                    <Text numberOfLines={1} style={{ maxWidth: width / 3.45, }}>
                                                                        <Text style={{ ...Fonts.grayColor14Medium }}>
                                                                            Fees: { }
                                                                        </Text>
                                                                        <Text style={{ ...Fonts.blackColor14Medium }}>
                                                                            {`$`}{doctor.fees}
                                                                        </Text>
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    ))
                }
            </View>
        )
    }

    function aboutHospitalInfo() {
        return (
            <View style={{}} >
                {aboutHospital()}
                {hospitalFacilitiesInfo()}
                {locationInfo()}
            </View>
        )
    }

    function locationInfo() {
        const location = {
            latitude: 37.78825,
            longitude: -122.4324,
        }
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold, }}>
                    Location
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Sizes.fixPadding + 5.0, }}>
                    <MaterialIcons
                        name='location-pin'
                        color={Colors.grayColor}
                        size={15.0}
                    />
                    <Text numberOfLines={2} style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.grayColor14Medium }}>
                        278 Collier Throughway Apt. 960, South Santinaborough, IN 90283
                    </Text>
                </View>
                <MapView
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.006,
                        longitudeDelta: 0.006,
                    }}
                    style={{ height: 120.0, }}
                >
                    <Marker coordinate={location} />
                </MapView>
            </View>
        )
    }

    function hospitalFacilitiesInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingHorizontal: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding - 5.0 }}>
                <Text style={{ ...Fonts.blackColor18SemiBold, marginBottom: Sizes.fixPadding + 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                    Hospital Facilities
                </Text>
                {
                    hospitalFacilitiesList.map((item, index) => (
                        <Text numberOfLines={1} key={`${index}`} style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}>
                            •  {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function aboutHospital() {
        return (
            <View style={styles.aboutHospitalWrapStyle}>
                <Text style={{ ...Fonts.blackColor18SemiBold,marginBottom:Sizes.fixPadding }}>
                    About Hospital
                </Text>
                {
                    aboutHospitals.map((item, index) => (
                        <Text key={`${index}`} style={{ ...Fonts.grayColor14Medium, paddingBottom: Sizes.fixPadding + 5.0, }}>
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function hospitalInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Mayo Clinic Scottsdale AZ
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                    General Hospital
                </Text>
            </View>
        )
    }

    function tabBar() {
        return (
            <View style={{ flex: 1, }}>
                {hospitalInfo()}
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: Colors.whiteColor }}>
                    {tabSort({ tabName: 'About', index: 0 })}
                    {tabSort({ tabName: 'Departments', index: 1 })}
                </View>
            </View>
        )
    }

    function tabSort({ tabName, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setselectedTabIndex(index) }}
                style={{ flex: 1, }}
            >
                <Text style={{ ...selectedTabIndex == index ? { ...Fonts.primaryColor16Bold } : { ...Fonts.lightGrayColor16Bold }, textAlign: 'center', marginBottom: Sizes.fixPadding, }}>
                    {tabName}
                </Text>
                <View style={{ height: 2.0, backgroundColor: selectedTabIndex == index ? Colors.primaryColor : Colors.whiteColor }} />
            </TouchableOpacity>
        )
    }
}

export default HospitalDetailScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Platform.OS == 'ios' ? Sizes.fixPadding - 8.0 : Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    aboutHospitalWrapStyle: {
        paddingBottom: Sizes.fixPadding - 5.0,
        paddingTop: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        paddingVertical: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    docorInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 5.0,
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
        width: (width / 4.7) - 15.0,
        height: '115%',
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
    }
})
