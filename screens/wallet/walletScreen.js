import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const recentTransactions = [
    {
        id: '1',
        transactionTitle: 'Omnicare Store',
        transactionDateAndTime: 'Feb 21, 2021 at 03:05 pm',
        transactionAmount: 80.00,
        itemsCount: 3,
        paymentMethod: 'COD',
    },
    {
        id: '2',
        transactionTitle: 'Central Rx Pharmacy',
        transactionDateAndTime: 'Aug 18, 2021 at 04:12 pm',
        transactionAmount: 75.00,
        itemsCount: 3,
        paymentMethod: 'PayPal',
    },
    {
        id: '3',
        transactionTitle: 'Fisrt Hill Phaarmacy Store',
        transactionDateAndTime: 'Sep 4, 2021 at 12:14 am',
        transactionAmount: 83.00,
        itemsCount: 5,
        paymentMethod: 'Credit Card',
    },
    {
        id: '4',
        transactionTitle: 'All Health Pharmacy',
        transactionDateAndTime: 'Jan 1, 2021 at 01:49 pm',
        transactionAmount: 12.50,
        itemsCount: 7,
        paymentMethod: 'COD',
    },
    {
        id: '5',
        transactionTitle: 'Lyfe Pgarmacy & Medical Store',
        transactionDateAndTime: 'Sep 4, 2021 at 12:14 am',
        transactionAmount: 16.50,
        itemsCount: 9,
        paymentMethod: 'PayPal',
    },
    {
        id: '6',
        transactionTitle: 'Omnicare Store',
        transactionDateAndTime: 'Feb 21, 2021 at 03:05 pm',
        transactionAmount: 80.00,
        itemsCount: 3,
        paymentMethod: 'COD',
    },
    {
        id: '7',
        transactionTitle: 'Central Rx Pharmacy',
        transactionDateAndTime: 'Aug 18, 2021 at 04:12 pm',
        transactionAmount: 75.00,
        itemsCount: 3,
        paymentMethod: 'PayPal',
    },
    {
        id: '8',
        transactionTitle: 'Fisrt Hill Phaarmacy Store',
        transactionDateAndTime: 'Sep 4, 2021 at 12:14 am',
        transactionAmount: 83.00,
        itemsCount: 5,
        paymentMethod: 'Credit Card',
    },
    {
        id: '9',
        transactionTitle: 'All Health Pharmacy',
        transactionDateAndTime: 'Jan 1, 2021 at 01:49 pm',
        transactionAmount: 12.50,
        itemsCount: 7,
        paymentMethod: 'COD',
    },
    {
        id: '10',
        transactionTitle: 'Lyfe Pgarmacy & Medical Store',
        transactionDateAndTime: 'Sep 4, 2021 at 12:14 am',
        transactionAmount: 16.50,
        itemsCount: 9,
        paymentMethod: 'PayPal',
    },
];

const WalletScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {availableBalanceInfo()}
                {recentTransactionInfo()}
            </View>
        </View>
    )

    function recentTransactionInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.transactionInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        {item.transactionTitle}
                    </Text>
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium }}>
                        {`$`}{item.transactionAmount.toFixed(2)}
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor14Medium }}>
                        {item.transactionDateAndTime}
                    </Text>
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                        {item.itemsCount} Items • {item.paymentMethod}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                data={recentTransactions}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                ListHeaderComponent={
                    <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                        Recent Transactions
                    </Text>
                }
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function availableBalanceInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Available Balance
                </Text>
                <Text style={{ ...Fonts.blackColor24Bold }}>
                    $250.50
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Wallet
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default WalletScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    transactionInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 6.0,
        paddingBottom: Sizes.fixPadding + 10.0
    }
})