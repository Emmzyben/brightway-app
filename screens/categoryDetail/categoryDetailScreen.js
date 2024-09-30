import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-material-menu';
import { showRating } from '../../components/showRatings';
import MyStatusBar from '../../components/myStatusBar';

const { width, height } = Dimensions.get('window');



const doctorsList = [
    {
        id: '1',
        doctorImage: require('../../assets/images/doctors/doctor1.png'),
        doctorName: 'Dr. Ismail Sendi',
        rating: 4.0,
        ratingCount: 152,
        serviceName: 'Doctor',
          
        bgColor: Colors.purpleColor,
    },
    {
        id: '2',
        doctorImage: require('../../assets/images/doctors/doctor2.png'),
        doctorName: 'Dr. Barry George',
        rating: 4.0,
        ratingCount: 152,
        serviceName: 'Nurse',
          
        bgColor: Colors.blueColor,
    },
    {
        id: '3',
        doctorImage: require('../../assets/images/doctors/doctor3.png'),
        doctorName: 'Dr. Carol Pollack',
        rating: 4.0,
        ratingCount: 152,
        serviceName: 'Doctor',
          
        bgColor: Colors.cyanColor,
    },
    {
        id: '4',
        doctorImage: require('../../assets/images/doctors/doctor4.png'),
        doctorName: 'Dr. Howard Axe',
        rating: 4.0,
        ratingCount: 152,
        serviceName: 'Nurse',
          
        bgColor: Colors.parrotColor,
    },
    {
        id: '5',
        doctorImage: require('../../assets/images/doctors/doctor5.png'),
        doctorName: 'Dr. Sally Amsel',
        rating: 4.0,
        ratingCount: 152,
        serviceName: 'Doctor',
          
        bgColor: Colors.greenColor,
    },
    {
        id: '6',
        doctorImage: require('../../assets/images/doctors/doctor6.png'),
        doctorName: 'Dr. Jean Bocage',
        rating: 4.0,
        ratingCount: 152,
        serviceName: 'Nurse',
          
        bgColor: Colors.yellowColor,
    },
    {
        id: '7',
        doctorImage: require('../../assets/images/doctors/doctor7.png'),
        doctorName: 'Dr. Don Doman',
        rating: 4.0,
        ratingCount: 152,
        serviceName: 'Doctor',
          
        bgColor: Colors.pitchColor,
    },
];

const CategoryDetailScreen = ({ navigation }) => {

  
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {nearestDoctorsInfo()}
            </View>
        </View>
    )

    function nearestDoctorsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('DoctorDetail') }}
                style={styles.docorInfoWrapStyle}
            >
                <View style={{ backgroundColor: item.bgColor, ...styles.doctorImageBackgroundStyle, }}>
                    <Image
                        source={item.doctorImage}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            {item.doctorName}
                        </Text>
                        <View style={{ marginLeft: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}>
                            {showRating({ number: item.rating })}
                            <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor11SemiBold }}>
                                ({item.ratingCount})
                            </Text>
                        </View>
                    </View>
                    <Text style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.serviceName}
                    </Text>
                  
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={doctorsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
               
            />
        )
    }

    function header() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Providers for this Category
                </Text>
             
            </View>
        )
    }
}

export default CategoryDetailScreen

const styles = StyleSheet.create({
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
        width: (width / 4.7) - 15.0,
        height: '115%',
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
    }
})