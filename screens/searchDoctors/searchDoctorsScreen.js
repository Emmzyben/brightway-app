import { StyleSheet, Text, View, Dimensions, TextInput, FlatList, Image, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { showRating } from '../../components/showRatings';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const doctorsList = [
    {
        id: '1',
        doctorImage: require('../../assets/images/doctors/doctor1.png'),
        doctorName: 'Dr. Ismail Sendi',
        rating: 4.0,
        ratingCount: 152,
        hospitalName: 'Apple Hospital',
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
        hospitalName: 'Mayo Clinic',
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
        hospitalName: 'Apple Hospital',
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
        hospitalName: 'Mayo Clinic',
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
        hospitalName: 'Apple Hospital',
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
        hospitalName: 'Mayo Clinic',
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
        hospitalName: 'Apple Hospital',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.pitchColor,
    },
];

const SearchDoctorsScreen = ({ navigation }) => {

    const [searchFieldFocus, setsearchFieldFocus] = useState(false);
    const [search, setsearch] = useState('Surgeon');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {searchFieldWithBackArrow()}
                {doctorsInfo()}
            </View>
        </View>
    )


    function doctorsInfo() {
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
                        {item.hospitalName}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ maxWidth: width / 3.45, }} >
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Exp: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                {item.experienceInYear} years
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
                                {`$`}{item.fees}
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={doctorsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor14Medium }}>
                            {doctorsList.length} Results Found
                        </Text>
                    </>
                }
                automaticallyAdjustKeyboardInsets={true}
            />
        )
    }

    function searchFieldWithBackArrow() {
        return (
            <View style={styles.searchFieldWithBackArrowWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} onPress={() => { navigation.pop() }} />
                <View style={styles.searchFieldWrapStyle}>
                    <TextInput
                        placeholder='Search for hospitals'
                        placeholderTextColor={Colors.grayColor}
                        style={{ flex: 1, ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}
                        onFocus={() => { setsearchFieldFocus(true) }}
                        onBlur={() => { setsearchFieldFocus(false) }}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        value={search}
                        onChangeText={(value) => { setsearch(value) }}
                    />
                    <MaterialIcons name="search" size={24} color={searchFieldFocus ? Colors.primaryColor : Colors.grayColor} />
                </View>
            </View>
        )
    }
}

export default SearchDoctorsScreen

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.bodyBackColor,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginLeft: Sizes.fixPadding * 2.0,
    },
    searchFieldWithBackArrowWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
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