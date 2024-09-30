import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const orderItemsList = [
    {
        id: '1',
        medicineName: 'Azithral 500 Tablet',
        qty: '2 Packs',
        amount: 7.00,
        prescriptionable: true,
    },
    {
        id: '2',
        medicineName: 'Angispan - TR 2.5mg Capsule',
        qty: '1 Bottle',
        amount: 3.50,
        prescriptionable: false,
    },
    {
        id: '3',
        medicineName: 'Xencial 120mg Tablet',
        qty: '2 Packs',
        amount: 12.00,
        prescriptionable: true,
    },
];

const OrderInfoScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {orderItemsInfo()}
                    {prescriptionUploadedInfo()}
                    {distanceAndAddressInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function distanceAndAddressInfo() {
        return (
            <View style={styles.distanceAndAddressInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                        20.5 km
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            { } (20 min)
                        </Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="location-arrow" size={14} color={Colors.primaryColor} />
                        <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.primaryColor14Bold }}>
                            Direction
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                    {addressShort({ iconName: 'map-marker', name: 'Omnicare Store', address: '83 Woodhedge Drive, Nottingham,', onPress: () => { navigation.push('ChatWithSeller') } })}
                    <View style={{ backgroundColor: Colors.bodyBackColor, height: 1.0, marginVertical: Sizes.fixPadding * 2.0, }} />
                    {addressShort({ iconName: 'location-arrow', name: 'Samantha Smith', address: 'Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX', onPress: () => { navigation.push('ChatWithCustomer') } })}
                </View>
            </View>
        )
    }

    function addressShort({ iconName, name, address, onPress }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome
                        name={iconName}
                        color={Colors.primaryColor}
                        size={18}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, marginRight: Sizes.fixPadding - 5.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            {name}
                        </Text>
                        <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}>
                            {address}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name='phone'
                        color={Colors.primaryColor}
                        size={15}
                        style={{ marginRight: Sizes.fixPadding + 5.0, }}
                    />
                    <MaterialCommunityIcons
                        name='message-processing'
                        color={Colors.primaryColor}
                        size={15}
                        onPress={onPress}
                    />
                </View>
            </View>
        )
    }

    function prescriptionUploadedInfo() {
        return (
            <View style={styles.prescriptionUploadedInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                    <MaterialCommunityIcons
                        name='prescription'
                        color={Colors.primaryColor}
                        size={28}
                    />
                    <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding + 3.0, ...Fonts.blackColor16Medium }}>
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

    function orderItemsInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, marginVertical: Sizes.fixPadding, padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Order Items
                </Text>
                {
                    orderItemsList.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{ flexDirection: 'row', marginTop: Sizes.fixPadding + 5.0, }}
                        >
                            <View style={{ flex: 1, }}>
                                <View style={{ maxWidth: width / 1.4, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                                        {item.medicineName}
                                    </Text>
                                    {
                                        item.prescriptionable
                                            ?
                                            <MaterialCommunityIcons
                                                name='prescription'
                                                color={Colors.primaryColor}
                                                size={20}
                                                style={{ marginLeft: Sizes.fixPadding - 7.0, marginRight: Sizes.fixPadding - 5.0, }}
                                            />
                                            :
                                            null
                                    }
                                </View>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    {item.qty}
                                </Text>
                            </View>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                ${item.amount.toFixed(2)}
                            </Text>
                        </View>
                    ))
                }
                <View style={{ marginTop: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center', }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.primaryColor16Bold }}>
                        Cash On Delivery
                    </Text>
                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                        $25.00
                    </Text>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Order Info
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default OrderInfoScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    prescriptionUploadedInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
    },
    distanceAndAddressInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0,
    }
})