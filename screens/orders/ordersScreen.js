import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TabView, TabBar } from 'react-native-tab-view';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const orderInProcessList = [
    {
        id: '1',
        image: require('../../assets/images/seller/seller2.png'),
        name: 'Central Rx Pharmacy',
        itemCount: 3,
        amount: 18.00,
        paymentMethod: 'COD',
        orderId: '#OD1589',
        orderStatus: 'In Transit'
    },
    {
        id: '2',
        image: require('../../assets/images/seller/seller1.png'),
        name: 'Omnicare Store',
        itemCount: 5,
        amount: 25.50,
        paymentMethod: 'PayPal',
        orderId: '#DE14G8',
        orderStatus: 'Confirmed'
    },
    {
        id: '3',
        image: require('../../assets/images/seller/seller3.png'),
        name: 'First Hill Pharmacy Store ',
        itemCount: 5,
        amount: 45.50,
        paymentMethod: 'PayPal',
        orderId: '#GT1485',
        orderStatus: 'Confirmed'
    },
];

const pastOrdersList = [
    {
        id: '1',
        image: require('../../assets/images/seller/seller4.png'),
        name: 'All Health Pharmacy',
        itemCount: 5,
        amount: 25.50,
        paymentMethod: 'PayPal',
        orderId: '#AE14G5',
    },
    {
        id: '2',
        image: require('../../assets/images/seller/seller6.png'),
        name: 'Newsay Drug Store',
        itemCount: 2,
        amount: 15.50,
        paymentMethod: 'COD',
        orderId: '#DR1589',
    },
    {
        id: '3',
        image: require('../../assets/images/seller/seller5.png'),
        name: 'Central Rx Pharmacy',
        itemCount: 5,
        amount: 45.50,
        paymentMethod: 'PayPal',
        orderId: '#GT1485',
    },
    {
        id: '4',
        image: require('../../assets/images/seller/seller1.png'),
        name: 'Newsay Drug Store',
        itemCount: 2,
        amount: 15.50,
        paymentMethod: 'COD',
        orderId: '#DR1589',
    },
];

const OrdersScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'In Process' },
        { key: 'second', title: 'Past' },
    ]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {tabs()}
            </View>
        </View>
    )

    function pastOrdersInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.infoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={item.image}
                        style={styles.imageStyle}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium }}>
                            {item.name}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                            {item.itemCount} Items • ${item.amount.toFixed(2)} • {item.paymentMethod}
                        </Text>
                        <View style={{ marginTop: Sizes.fixPadding - 3.0, flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Order ID { }
                            </Text>
                            <Text style={{ textAlign: 'right', flex: 1, ...Fonts.grayColor14Medium }}>
                                {item.orderId}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Status { }
                            </Text>
                            <Text style={{ textAlign: 'right', flex: 1, ...Fonts.blackColor14Bold }}>
                                Delivered
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: width / 3.8, alignItems: 'center', marginTop: Sizes.fixPadding - 2.0, }}>
                    <Text
                        onPress={() => { navigation.push('Review') }}
                        style={{ ...Fonts.primaryColor14Bold }}
                    >
                        Review now
                    </Text>
                </View>
            </View>
        )
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={pastOrdersList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function orderInProcessInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('OrderStatus') }}
                style={{ ...styles.infoWrapStyle, flexDirection: 'row', alignItems: 'center' }}
            >
                <Image
                    source={item.image}
                    style={styles.imageStyle}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium }}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                        {item.itemCount} Items • ${item.amount.toFixed(2)} • {item.paymentMethod}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 3.0, flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            Order ID { }
                        </Text>
                        <Text style={{ textAlign: 'right', flex: 1, ...Fonts.grayColor14Medium }}>
                            {item.orderId}
                        </Text>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            Status { }
                        </Text>
                        <Text style={{ textAlign: 'right', flex: 1, ...item.orderStatus == 'Confirmed' ? { ...Fonts.primaryColor14Bold } : { ...Fonts.darkYellowColor14Bold } }}>
                            {item.orderStatus}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={orderInProcessList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function tabs() {
        const renderScene = ({ route, jumpTo }) => {
            switch (route.key) {
                case 'first':
                    return orderInProcessInfo()
                case 'second':
                    return pastOrdersInfo()
            }
        };
        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: Colors.primaryColor, height: 2.0 }}
                        style={{ backgroundColor: Colors.whiteColor, elevation: 0.0 }}
                        pressColor={Colors.primaryColor}
                        renderLabel={({ route, focused }) => (
                            <Text style={focused ? { ...Fonts.primaryColor16Bold } : { ...Fonts.lightGrayColor16Bold }}>
                                {route.title}
                            </Text>
                        )}
                    />
                )}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    My Orders
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default OrdersScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    imageStyle: {
        width: width / 3.8,
        height: width / 3.8,
        minHeight: 100.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    infoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0,
    }
})