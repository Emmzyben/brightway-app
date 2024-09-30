import { StyleSheet, Text, View, FlatList, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons'
import Banner from '../../components/banner';

const { width } = Dimensions.get('window');

const banners = [
    {
        banner: require('../../assets/images/banner_bg.png'),
        desc: 'Your Health Is The Greatest Wealth You Can Acquire',
    },
    {
        banner: require('../../assets/images/banner_bg.png'),
        desc: 'Your Health Is The Greatest Wealth You Can Acquire',
    },
    {
        banner: require('../../assets/images/banner_bg.png'),
        desc: 'Your Health Is The Greatest Wealth You Can Acquire',
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

const sellersList = [
    {
        id: '1',
        storeImage: require('../../assets/images/seller/seller1.png'),
        storeName: 'Omnicare Store',
        address: '83 Woodhedge Drive, Nottingham',
    },
    {
        id: '2',
        storeImage: require('../../assets/images/seller/seller2.png'),
        storeName: 'Central Rx Pharmacy',
        address: 'Thornridge Cir. Shiloh, Hawaii 81063',
    },
    {
        id: '3',
        storeImage: require('../../assets/images/seller/seller3.png'),
        storeName: 'First Hill Pharmacy Store',
        address: 'Ash Dr. San Jose, South Dakota 7596',
    },
    {
        id: '4',
        storeImage: require('../../assets/images/seller/seller4.png'),
        storeName: 'All Health Pharmacy',
        address: 'W. Gray St. Utica, Pennsylvania 5786',
    },
    {
        id: '5',
        storeImage: require('../../assets/images/seller/seller5.png'),
        storeName: 'Lyfe Pharmacy & Medical  Store',
        address: 'Royal Ln. Mesa, New Jersey 45463',
    },
    {
        id: '6',
        storeImage: require('../../assets/images/seller/seller6.png'),
        storeName: 'Newday Drug Store',
        address: 'Ranchview Dr. Richardson, California',
    },
];

const MedicineScreen = ({ navigation }) => {

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
            {userInfo()}
            <FlatList
                ListHeaderComponent={
                    <>
                        {searchField()}
                        <Banner banners={banners} bannerRef={bannerRef} />
                        {shopNearInfo()}
                        {sellerNearInfo()}
                    </>
                }
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
            />
        </View>
    )

    function sellerNearInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('SellerProfile') }}
                style={styles.sellerInfoWrapStyle}
            >
                <Image
                    source={item.storeImage}
                    style={{ width: 80.0, height: 60.0, borderRadius: Sizes.fixPadding - 5.0, }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        {item.storeName}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialIcons name='location-pin' color={Colors.lightGrayColor} size={15} />
                        <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding - 7.0, flex: 1, ...Fonts.grayColor14Medium }}>
                            {item.address}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                    Seller Near You
                </Text>
                <FlatList
                    data={sellersList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}
                />
            </View>
        )
    }

    function shopNearInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { }}
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
                <View style={styles.shopNearTitleStyle}>
                    <Text style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                        Shop Near You
                    </Text>
                    <Text
                        onPress={() => { navigation.push('ShopByCategory') }}
                        style={{ ...Fonts.primaryColor14Bold }}
                    >
                        View all
                    </Text>
                </View>
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
                        placeholder='Search for hospitals'
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

    function userInfo() {
        return (
            <View style={styles.userInfoWrapStyle}>
                <Image
                    source={require('../../assets/images/users/user1.png')}
                    style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17Bold }}>
                        Hello, Samantha Smith
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                        Pasadena, Oklahoma
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('Cart') }}
                >
                    <MaterialIcons
                        name='shopping-cart'
                        color={Colors.blackColor}
                        size={22}
                    />
                    <View style={styles.cartItemCountWrapStyle}>
                        <Text numberOfLines={1} style={{ ...Fonts.whiteColor10Bold }}>
                            1
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MedicineScreen

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
    userInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    searchFieldStyle: {
        height: 20.0,
        flex: 1,
        ...Fonts.blackColor14Medium,
        marginLeft: Sizes.fixPadding
    },
    cartItemCountWrapStyle: {
        width: 14.0,
        height: 14.0,
        borderRadius: 7.0,
        backgroundColor: Colors.redColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -5.0,
        right: -5.0,
    },
    shopNearTitleStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    sellerInfoWrapStyle: {
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    }
})