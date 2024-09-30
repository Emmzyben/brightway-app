import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MapView, { Marker } from "react-native-maps";
import { Key } from "../../constants/key";
import MapViewDirections from 'react-native-maps-directions';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const OrderTrackScreen = ({ navigation }) => {

    const pickupLocation = {
        latitude: 22.642882,
        longitude: 88.437248,
    };

    const dropLocation = {
        latitude: 22.640347,
        longitude: 88.447383,
    }

    const currentLocation = {
        latitude: 22.636465,
        longitude: 88.439223,
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {mapView()}
                {deliveryBoyInfoWithCallAndMessageButton()}
            </View>
        </View>
    )

    function deliveryBoyInfoWithCallAndMessageButton() {
        return (
            <View>
                <View style={styles.deliveryBoyInfoWrapStyle}>
                    <Image
                        source={require('../../assets/images/users/user9.png')}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18SemiBold }}>
                            Cameron Williamson
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                            Delivery Partner
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { }}
                        style={{ backgroundColor: Colors.bodyBackColor, ...styles.callAndMessageButtonStyle, }}
                    >
                        <MaterialIcons name='phone' color={Colors.primaryColor} size={18} />
                        <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.primaryColor17Bold }}>
                            Call
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { navigation.push('ChatWithDeliveryBoy') }}
                        style={{ backgroundColor: Colors.primaryColor, ...styles.callAndMessageButtonStyle, }}
                    >
                        <MaterialIcons name='chat' color={Colors.whiteColor} size={18} />
                        <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor17Bold }}>
                            Chat
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function mapView() {
        return (
            <MapView
                style={{ flex: 1, }}
                initialRegion={{
                    ...currentLocation,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
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
                        source={require('../../assets/images/icons/homeMarker.png')}
                        style={{ width: 50.0, height: 50.0, resizeMode: 'contain' }}
                    />
                </Marker>
                <Marker coordinate={currentLocation}>
                    <Image
                        source={require('../../assets/images/icons/deliveryBoyMarker.png')}
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

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Order Track
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default OrderTrackScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    deliveryBoyInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    callAndMessageButtonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: Sizes.fixPadding * 2.0,
    }
})