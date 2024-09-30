import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyStatusBar from '../../components/myStatusBar';

const { width, height } = Dimensions.get('window');

const OrderStatusScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {orderInfo()}
            </View>
            {bottomImage()}
        </View>
    )

    function bottomImage() {
        return (
            <Image
                source={require('../../assets/images/orderPlaced.png')}
                style={{ width: '100%', height: height / 3.5, resizeMode: 'stretch' }}
            />
        )
    }

    function orderInfo() {
        return (
            <View style={styles.orderInfoWrapStyle}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {trackShort({
                        iconName: 'clock',
                        status: 'Order Confirmed',
                        time: 'Feb 21, 2021 at 03:05 pm',
                    })}
                    {trackShort({
                        iconName: 'map',
                        status: 'On the Way',
                        time: 'Feb 23, 2021 at 03:05 pm',
                        withTrack: true,
                        style: { marginTop: -5.0, }
                    })}
                    {trackShort({
                        iconName: 'home',
                        status: 'Delivered',
                        time: 'Finish time in 3 min',
                        isLast: true,
                        style: { marginTop: -3.0, }
                    })}
                </ScrollView>
            </View>
        )
    }

    function trackShort({ status, time, isLast, style, iconName, withTrack }) {
        return (
            <View style={{ flexDirection: 'row', ...style }}>
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={iconName}
                        color={Colors.primaryColor}
                        size={20}
                    />
                    {
                        isLast
                            ?
                            null
                            :
                            <Text style={{ ...Fonts.primaryColor10Regular, marginLeft: 2.0, marginTop: -8.0, }}>
                                |{`\n`}|{`\n`}|{`\n`}|{`\n`}|{`\n`}|{`\n`}|
                            </Text>
                    }
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding * 3.0 }}>
                    {
                        withTrack
                            ?
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                                    {status}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => { navigation.push('OrderTrack') }}
                                    style={{ flexDirection: 'row' }}
                                >
                                    <FontAwesome
                                        name='location-arrow'
                                        color={Colors.primaryColor}
                                        size={15}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.primaryColor14Bold }}>
                                        Track
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {status}
                            </Text>
                    }
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', }}>
                        <MaterialIcons
                            name='access-alarm'
                            color={Colors.primaryColor}
                            size={16}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {time}
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
                        Order Status
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Invoice: #OD1589
                    </Text>
                </View>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0, top: 20.0, }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default OrderStatusScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    orderInfoWrapStyle: {
        maxHeight: height / 2.0,
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    }
})