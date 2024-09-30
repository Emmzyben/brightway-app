import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const cartItems = [
    {
        id: '1',
        medicineName: 'Azithral 500 Tablet',
        prescriptionable: true,
        qty: '2 Packs',
        totaAmount: 7.00,
    },
    {
        id: '2',
        medicineName: 'Angispan - TR 2.5mg Capsule',
        prescriptionable: false,
        qty: '1 Bottle',
        totaAmount: 3.50,
    },
];

const CheckoutScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
                    {deliveryAddressInfo()}
                    {cartItemInfo()}
                    {prescriptionInfo()}
                    {couponInfo()}
                    {totalInfo()}
                </ScrollView>
            </View>
            {continueToPayButton()}
        </View>
    )

    function continueToPayButton() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('PaymentMethods') }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Continue to Pay
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function totalInfo() {
        return (
            <View style={{ ...styles.infoWrapStyle, marginVertical: Sizes.fixPadding }}>
                {totalInfoShort({ title: 'Sub Total', value: 11.00 })}
                <View style={{ marginVertical: Sizes.fixPadding }}>
                    {totalInfoShort({ title: 'Service Charge', value: 4.00 })}
                </View>
                {totalInfoShort({ title: 'Coupon Code Applied', value: -2.00 })}
            </View>
        )
    }

    function totalInfoShort({ title, value }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    {`$`}{value.toFixed(2)}
                </Text>
            </View>
        )
    }

    function couponInfo() {
        return (
            <View style={{ ...styles.infoWrapStyle }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Add Coupon
                </Text>
                <View style={styles.couponInfoWrapStyle}>
                    <Text style={{ flex: 1, ...Fonts.grayColor14Medium }}>
                        Coupon Code
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.darkGreenColor14SemiBold }}>
                            drugstore
                        </Text>
                        <MaterialIcons name="check-circle" size={16} color={Colors.darkGreenColor} style={{ marginLeft: Sizes.fixPadding }} />
                    </View>
                </View>
            </View>
        )
    }

    function prescriptionInfo() {
        return (
            <View style={{ ...styles.infoWrapStyle, ...styles.prescriptionInfoWrapStyle }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name='prescription'
                        size={28}
                        color={Colors.primaryColor}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1, ...Fonts.blackColor16Medium }}>
                        Prescription Uploaded
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name='remove-red-eye'
                        color={Colors.primaryColor}
                        size={18}
                    />
                    <MaterialIcons
                        name='delete'
                        color={Colors.primaryColor}
                        size={18}
                        style={{ marginLeft: Sizes.fixPadding + 2.0 }}
                    />
                </View>
            </View>
        )
    }

    function cartItemInfo() {
        return (
            <View style={{ ...styles.infoWrapStyle }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Items in Cart
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 3.0 }}>
                    {
                        cartItems.map((item) => (
                            <View
                                key={`${item.id}`}
                                style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding - 3.0, }}
                            >
                                <View style={{ flex: 1, }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={{ maxWidth: width - 110.0, ...Fonts.blackColor16Medium }}>
                                            {item.medicineName}
                                        </Text>
                                        {
                                            item.prescriptionable
                                                ?
                                                <MaterialCommunityIcons
                                                    name='prescription'
                                                    color={Colors.primaryColor}
                                                    size={20}
                                                    style={{ marginLeft: Sizes.fixPadding - 5.0, }}
                                                />
                                                :
                                                null
                                        }
                                    </View>
                                    <Text style={{ ...Fonts.grayColor14Medium }}>
                                        {item.qty}
                                    </Text>
                                </View>
                                <Text style={{ ...Fonts.primaryColor15Bold }}>
                                    {`$`}{item.totaAmount.toFixed(2)}
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }

    function deliveryAddressInfo() {
        return (
            <View style={{ ...styles.infoWrapStyle, marginVertical: Sizes.fixPadding, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Delivery Address
                </Text>
                <View style={{ marginTop: Sizes.fixPadding + 5.0, flexDirection: 'row', }}>
                    <MaterialIcons
                        name='home'
                        color={Colors.primaryColor}
                        size={16}
                        style={{ marginTop: Sizes.fixPadding - 8.0 }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding - 2.0, }}>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            Home
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                            Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Checkout
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default CheckoutScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    infoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0
    },
    prescriptionInfoWrapStyle: {
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
    },
    couponInfoWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        flexDirection: 'row',
        padding: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 8.0,
        marginBottom: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        ...CommonStyles.buttonShadow
    },
})