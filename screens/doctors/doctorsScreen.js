import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons'
import Banner from '../../components/banner';
import UserInfo from '../../components/userInfo';

const { width } = Dimensions.get('window');


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

const specialitiesList = [
    'Addiction Specialist',
    'Cardiologist',
    'Critical Care Specialist',
    'Endocrinologist',
    'Gastroenterologist',
    'Neurologist',
    'Reproductive Endocrinologist',
    'Urogynecologist',
    'Women\'s Health Nurse Practitioner',
    'Infectious Disease Specialist'
];

const DoctorsScreen = ({ navigation }) => {

    

    const [searchFieldFocus, setsearchFieldFocus] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <UserInfo />
            <FlatList
                ListHeaderComponent={
                    <>
                        {categoryInfo()}
                        {listOfSpecialitiesInfo()}
                    </>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    )

    function listOfSpecialitiesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 3.0, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                    List of Services
                </Text>
                <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding * 2.0 }}>
                    {
                        specialitiesList.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { navigation.push('SearchDoctors') }}
                                key={`${index}`}
                                style={{
                                    flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0,
                                    marginBottom: Sizes.fixPadding * 2.0
                                }}
                            >
                                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                                    •   {item}
                                </Text>
                                <MaterialIcons
                                    name='arrow-forward-ios'
                                    color={Colors.primaryColor}
                                    size={13}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
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
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('SearchDoctors') }}
                style={{ backgroundColor: Colors.whiteColor, paddingBottom: (width / 2.6) / 1.85 }}
            >
                <View style={styles.searchFieldWrapStyle}>
                    <MaterialIcons name="search" size={24} color={searchFieldFocus ? Colors.primaryColor : Colors.grayColor} />
                    <Text style={{ flex: 1, ...Fonts.grayColor14Medium, marginLeft: Sizes.fixPadding }}>
                        Search for doctors
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default DoctorsScreen

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
})