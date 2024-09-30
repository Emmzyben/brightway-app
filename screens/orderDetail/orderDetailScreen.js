import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const orderItems = [
    {
        id: '1',
        medicineName: 'Azithral 500 Tablet',
        qty: '2 Packs',
        prescripsable: true,
        amount: 7.00,
    },
    {
        id: '2',
        medicineName: 'Angispan - TR 2.5mg Capsule',
        qty: '1 Bottle',
        prescripsable: false,
        amount: 3.50,
    },
];

const OrderDetailScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {orderInfo()}
                    {orderItemInfo()}
                    {prescriptionUploadedInfo()}
                    {totalInfo()}
                    {deliveryPartnerInfo()}
                </ScrollView>
            </View>
            {markAsReadyButton()}
        </View>
    )

    function markAsReadyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('OrderTrack') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Mark as Ready
                </Text>
            </TouchableOpacity>
        )
    }

    function deliveryPartnerInfo() {
        return (
            <View style={styles.deliveryPartnerInfoWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/users/user6.png')}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18SemiBold }}>
                            Cameron Williamson
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                            Delivery Partner Assign
                        </Text>
                    </View>
                </View>
                <FontAwesome name="location-arrow" size={18} color={Colors.primaryColor} />
            </View>
        )
    }

    function totalInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingHorizontal: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding + 8.0 }}>
                {totalShort({ title: 'Sub Total', value: '$11.00' })}
                {totalShort({ title: 'Service Charge', value: '$4.00' })}
                {totalShort({ title: 'Coupon Code Applied', value: '$-2.00' })}
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Bold }}>
                        Amount via COD
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        $13.00
                    </Text>
                </View>
            </View>
        )
    }

    function totalShort({ title, value }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding }}>
                <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    {value}
                </Text>
            </View>
        )
    }

    function prescriptionUploadedInfo() {
        return (
            <View style={styles.prescriptionUploadedWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <MaterialCommunityIcons name="prescription" size={28} color={Colors.primaryColor} style={{ marginLeft: Sizes.fixPadding - 8.0, }} />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1, ...Fonts.blackColor16Medium }}>
                        Prescription Uploaded
                    </Text>
                </View>
                <MaterialIcons
                    name='remove-red-eye'
                    color={Colors.primaryColor}
                    size={18}
                />
            </View>
        )
    }

    function orderItemInfo() {
        return (
            <View style={styles.orderItemInfoWrapStyle}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Order Items
                </Text>
                {
                    orderItems.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding + 5.0, }}
                        >
                            <View style={{ flex: 1, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ maxWidth: width - 120.0, ...Fonts.blackColor16Medium }}>
                                        {item.medicineName}
                                    </Text>
                                    {
                                        item.prescripsable
                                            ?
                                            <MaterialCommunityIcons name="prescription" size={20} color={Colors.primaryColor} style={{ marginLeft: Sizes.fixPadding - 8.0, }} />
                                            :
                                            null
                                    }
                                </View>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    {item.qty}
                                </Text>
                            </View>
                            <Text style={{ ...Fonts.primaryColor15Bold }}>
                                ${item.amount.toFixed(2)}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function orderInfo() {
        const orderStatus = 'Pending';
        return (
            <View style={styles.orderInfoWrapStyle}>
                <Image
                    source={require('../../assets/images/users/user1.png')}
                    style={{ width: 50.0, height: 50.0, borderRadius: Sizes.fixPadding - 5.0 }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            Samantha Smith
                        </Text>
                        <Text style={orderStatus == 'Pending' ? { ...Fonts.darkYellowColor14Bold } : { ...Fonts.primaryColor14Bold }}>
                            {orderStatus == 'Pending' ? 'Pending' : 'Accepted'}
                        </Text>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding - 6.0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor14Medium }}>
                            Feb 21, 2021 at 03:05 pm
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            $18.50 • COD
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ maxWidth: width - 70, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
                        Order Details
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Invoice: #OD1589
                    </Text>
                </View>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    orderInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderItemInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding - 5.0,
    },
    prescriptionUploadedWrapStyle: {
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0
    },
    deliveryPartnerInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        padding: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})