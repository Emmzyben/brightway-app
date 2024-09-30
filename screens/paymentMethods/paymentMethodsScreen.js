import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const PaymentMethodsScreen = ({ navigation }) => {

    const [selectedIndex, setselectedIndex] = useState(1);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {amountInfo()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                    {paymentModes()}
                </ScrollView>
            </View>
        </View>
    )

    function paymentModes() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    Payment Modes
                </Text>
                <View style={{ marginTop: Sizes.fixPadding * 3.0, marginBottom: Sizes.fixPadding * 2.5 }}>
                    {paymentMethodShort({
                        icon: <MaterialCommunityIcons name="wallet" size={21} color={Colors.primaryColor} />,
                        method: 'Wallet',
                        index: 1
                    })}
                    {divider()}
                    {paymentMethodShort({
                        icon: <MaterialCommunityIcons name="cash" size={25} color={Colors.primaryColor} />,
                        method: 'Cash On Delivery',
                        index: 2
                    })}
                    {divider()}
                    {paymentMethodShort({
                        icon: <FontAwesome5 name="paypal" size={21} color={Colors.primaryColor} />,
                        method: 'PayPal',
                        index: 3
                    })}
                    {divider()}
                    {paymentMethodShort({
                        icon: <Fontisto name="payu" size={15} color={Colors.primaryColor} />,
                        method: 'PayU Money',
                        index: 4
                    })}
                    {divider()}
                    {paymentMethodShort({
                        icon: <FontAwesome5 name="stripe-s" size={15} color={Colors.primaryColor} />,
                        method: 'Stripe',
                        index: 5
                    })}
                </View>
            </View>
        )
    }

    function divider() {
        return (
            <View style={styles.dividerStyle} />
        )
    }

    function paymentMethodShort({ icon, method, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setselectedIndex(index)
                    navigation.push('OrderPlaced')
                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={styles.paymentIconWrapStyle}>
                        {icon}
                    </View>
                    <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}>
                        {method}
                    </Text>
                </View>
                <View style={{ borderColor: selectedIndex == index ? Colors.primaryColor : Colors.lightGrayColor, ...styles.radioButtonStyle, }}>
                    {
                        selectedIndex == index
                            ?
                            <View style={{ backgroundColor: Colors.primaryColor, width: 8.0, height: 8.0, borderRadius: 4.0 }} />
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    function amountInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Amount to Pay
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor24Bold }}>
                    $13.00
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Select Payment Method
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default PaymentMethodsScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    radioButtonStyle: {
        width: 18.0,
        height: 18.0,
        borderWidth: 1.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentIconWrapStyle: {
        width: 24.0,
        height: 24.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dividerStyle: {
        backgroundColor: Colors.bodyBackColor,
        height: 1.0,
        marginRight: Sizes.fixPadding * 4.0,
        marginVertical: Sizes.fixPadding * 2.5
    }
})