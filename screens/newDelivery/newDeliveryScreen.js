import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView from "react-native-maps";
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

const NewDeliveryScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            {mapView()}
            {deliveryInfo()}
        </View>
    )

    function deliveryInfo() {
        return (
            <View style={styles.deliveryInfoWrapper}>
                {distanceInfo()}
                <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
                    {addressShort({ iconName: 'map-marker', name: 'Omnicare Store', address: '83 Woodhedge Drive, Nottingham,', onPress: () => { navigation.push('ChatWithSeller') } })}
                    <View style={{ backgroundColor: Colors.bodyBackColor, height: 1.0, marginVertical: Sizes.fixPadding * 2.0, }} />
                    {addressShort({ iconName: 'location-arrow', name: 'Samantha Smith', address: 'Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX', onPress: () => { navigation.push('ChatWithCustomer') } })}
                </View>
                {acceptDeliveryButton()}
            </View>
        )
    }

    function acceptDeliveryButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('AcceptDelivery') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor17Bold }}>
                    Accept Delivery
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="location-arrow" size={14} color={Colors.primaryColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.primaryColor14Bold }}>
                        Direction
                    </Text>
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

    function mapView() {
        return (
            <MapView
                region={{
                    latitude: 22.644066,
                    longitude: 88.421220,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
                style={{ flex: 1 }}
                mapType="terrain"
            >
            </MapView>
        )
    }
}

export default NewDeliveryScreen

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
    }
})