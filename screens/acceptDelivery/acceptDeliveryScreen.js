import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from "react-native-maps";
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Key from '../../constants/key';
import MapViewDirections from 'react-native-maps-directions';
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

const AcceptDeliveryScreen = ({ navigation }) => {

    const pickupLocation = {
        latitude: 22.642882,
        longitude: 88.437248,
    };

    const dropLocation = {
        latitude: 22.640347,
        longitude: 88.447383,
    }

    const [showOrderDetailSheet, setshowOrderDetailSheet] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {mapView()}
                {backArrow()}
                {deliveryInfo()}
            </View>
            {orderDetailSheet()}
        </View>
    )

    function orderDetailSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showOrderDetailSheet}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setshowOrderDetailSheet(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={{
                                backgroundColor: Colors.whiteColor, borderTopLeftRadius: Sizes.fixPadding, borderTopRightRadius: Sizes.fixPadding
                            }}>
                                <View style={styles.sheetHeaderStyle}>
                                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.primaryColor18SemiBold }}>
                                        Order Details
                                    </Text>
                                    <MaterialIcons
                                        name='close'
                                        color={Colors.primaryColor}
                                        size={20}
                                        onPress={() => { setshowOrderDetailSheet(false) }}
                                    />
                                </View>
                                {
                                    orderItemsList.map((item) => (
                                        <View
                                            key={`${item.id}`}
                                            style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding + 5.0, }}
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
                                <View style={styles.sheetFooterStyle}>
                                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.primaryColor16Bold }}>
                                        Cash On Delivery
                                    </Text>
                                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                                        $25.00
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name='arrow-back'
                color={Colors.blackColor}
                size={24}
                onPress={() => { navigation.pop() }}
                style={{ position: 'absolute', top: 20.0, left: 20.0 }}
            />
        )
    }

    function deliveryInfo() {
        return (
            <View style={styles.deliveryInfoWrapper}>
                {distanceInfo()}
                <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
                    {addressShort({ iconName: 'map-marker', name: 'Omnicare Store', address: '83 Woodhedge Drive, Nottingham,', onPress: () => { navigation.push('ChatWithSeller') } })}
                    <View style={{ backgroundColor: Colors.bodyBackColor, height: 1.0, marginVertical: Sizes.fixPadding * 2.0, }} />
                    {addressShort({ iconName: 'location-arrow', name: 'Samantha Smith', address: 'Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX', onPress: () => { navigation.push('ChatWithCustomer') } })}
                </View>
                {markAsReadButton()}
            </View>
        )
    }

    function markAsReadButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('DeliverySuccess') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Mark as Picked
                </Text>
            </TouchableOpacity>
        )
    }

    function distanceInfo() {
        return (
            <View style={styles.distanceInfoWrapStyle}>
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor18SemiBold }}>
                    20.5 km
                    <Text style={{ ...Fonts.grayColor14Medium }}>
                        { } (20 min)
                    </Text>
                </Text>
                <Text onPress={() => { setshowOrderDetailSheet(true) }} style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.primaryColor14Bold }}>
                    Order Detail
                </Text>
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

    function mapView() {
        return (
            <MapView
                region={{
                    latitude: 22.636465,
                    longitude: 88.439223,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
                style={{ flex: 1, }}
                mapType="terrain"
            >
                <Marker coordinate={pickupLocation}>
                    <View style={{ width: 45.0, height: 45.0, backgroundColor: Colors.primaryColor, borderRadius: 22.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../assets/images/icons/marker2.png')}
                            style={{ width: 29.0, height: 29.0, resizeMode: 'contain', }}
                        />
                    </View>
                </Marker>
                <Marker coordinate={dropLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker.png')}
                        style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                    />
                </Marker>
                <MapViewDirections
                    origin={pickupLocation}
                    destination={dropLocation}
                    apikey={Key.apiKey}
                    lineDashPattern={[1]}
                    lineCap="square"
                    strokeColor={Colors.primaryColor}
                    strokeWidth={Platform.OS == 'ios' ? 2 : 3}
                />
            </MapView>
        )
    }
}

export default AcceptDeliveryScreen

const styles = StyleSheet.create({
    deliveryInfoWrapper: {
        elevation: 10.0,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    distanceInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.bodyBackColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0
    },
    sheetHeaderStyle: {
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
    },
    sheetFooterStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    }
})