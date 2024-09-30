import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { Overlay } from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const cartItems = [
    {
        key: '1',
        medicineImage: require('../../assets/images/medicines/medicine1.png'),
        medicineName: 'Azithral 500 Tablet',
        medicineDetail: 'Azithromycin',
        amount: 3.50,
        qty: 1,
    },
    {
        key: '2',
        medicineImage: require('../../assets/images/medicines/medicine2.png'),
        medicineName: 'Xencial 120mg Tablet',
        medicineDetail: 'Phenylephrine',
        amount: 2.50,
        qty: 1,
    },
    {
        key: '3',
        medicineImage: require('../../assets/images/medicines/medicine4.png'),
        medicineName: 'Almox 500 Capsule',
        medicineDetail: 'Pheniramine',
        amount: 4.00,
        qty: 1,
    },
    {
        key: '4',
        medicineImage: require('../../assets/images/medicines/medicine8.png'),
        medicineName: 'Angispan - TR 2.5mg Capsule',
        medicineDetail: 'Azithromycin',
        amount: 3.50,
        qty: 1,
    },
];

const rowSwipeAnimatedValues = {};

Array(cartItems.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const CartScreen = ({ navigation }) => {

    const [listData, setListData] = useState(cartItems);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [showPrescriptionDialog, setshowPrescriptionDialog] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {listData.length == 0 ? cartEmptyInfo() : cartItemsInfo()}
            </View>
            {listData.length == 0 ? null : checkoutButton()}
            {prescriptionDialog()}
            {snackBarInfo()}
        </View>
    )

    function prescriptionDialog() {
        return (
            <Overlay
                isVisible={showPrescriptionDialog}
                onBackdropPress={() => { setshowPrescriptionDialog(false) }}
                overlayStyle={styles.dialogStyle}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 3.0, }}>
                        <Image
                            source={require('../../assets/images/uploadPrescription.png')}
                            style={styles.prescriptionImageStyle}
                        />
                        <View style={{ marginVertical: Sizes.fixPadding * 3.0, }}>
                            <Text style={{ textAlign: 'center', ...Fonts.primaryColor18SemiBold }}>
                                Prescription Require
                            </Text>
                            <Text style={{ textAlign: 'center', ...Fonts.grayColor14Medium }}>
                                Your order contains 2 items which required Doctor’s prescription.
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setshowPrescriptionDialog(false)
                                navigation.push('Checkout')
                            }}
                            style={{ ...styles.buttonStyle, marginHorizontal: 0.0 }}
                        >
                            <Text numberOfLines={1} style={{ ...Fonts.whiteColor17Bold }}>
                                Upload Prescription
                            </Text>
                        </TouchableOpacity>
                        <Text
                            onPress={() => { setshowPrescriptionDialog(false) }}
                            style={{ textAlign: 'center', ...Fonts.primaryColor17Bold }}
                        >
                            Cancel
                        </Text>
                    </View>
                </ScrollView>
            </Overlay>
        )
    }

    function checkoutButton() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setshowPrescriptionDialog(true) }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function totalInfo() {
        const serviceFee = 4.0;
        const total = listData.reduce((tot, item) => tot + item.qty * item.amount, 0);
        const payableAmount = (total + serviceFee);
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingHorizontal: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding + 8.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        Sub Total
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {`$`}{total.toFixed(2)}
                    </Text>
                </View>
                <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        Service Charge
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        ${serviceFee.toFixed(2)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Bold }}>
                        Amount Payable
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        ${payableAmount.toFixed(2)}
                    </Text>
                </View>
            </View>
        )
    }

    function cartEmptyInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                    name='shopping-cart'
                    color={Colors.lightGrayColor}
                    size={40}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.lightGrayColor16Bold }}>
                    Cart is Empty
                </Text>
            </View>
        )
    }

    function changeQty({ key, type }) {
        const copyData = listData;
        const newData = copyData.map((item) => {
            if (item.key == key) {
                return { ...item, qty: type == 'reduce' ? item.qty - 1 : item.qty + 1 }
            }
            else {
                return item
            }
        })
        setListData(newData);
    }

    function cartItemsInfo() {

        const closeRow = (rowMap, rowKey) => {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
            }
        };

        const renderHiddenItem = (data, rowMap) => (
            <View style={{ alignItems: 'center', flex: 1 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ ...styles.deleteIconWrapStyle, right: 0, }}
                    onPress={() => deleteRow(rowMap, data.item.key)}
                >
                    <Animated.View
                        style={[
                            {
                                transform: [
                                    {
                                        scale: rowSwipeAnimatedValues[
                                            data.item.key
                                        ].interpolate({
                                            inputRange: [50, 90],
                                            outputRange: [0, 1],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <View style={styles.deleteCircleStyle}>
                            <MaterialIcons
                                name="delete"
                                size={25}
                                color={Colors.whiteColor}
                                style={{}}
                            />
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );

        const deleteRow = (rowMap, rowKey) => {
            closeRow(rowMap, rowKey);
            const newData = [...listData];
            const prevIndex = listData.findIndex(item => item.key === rowKey);
            newData.splice(prevIndex, 1);
            setShowSnackBar(true);
            setListData(newData);
        };

        const onSwipeValueChange = swipeData => {
            const { key, value } = swipeData;
            rowSwipeAnimatedValues[key].setValue(Math.abs(value));
        };

        const renderItem = data => (
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <View style={styles.itemWrapStyle}>
                    <Image
                        source={data.item.medicineImage}
                        style={{ width: width / 4.2, height: 65.0, resizeMode: 'contain' }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            {data.item.medicineName}
                        </Text>
                        <Text numberOfLines={1} style={{ marginVertical: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                            {data.item.medicineDetail}
                        </Text>
                        <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...Fonts.primaryColor16Bold }}>
                                ${data.item.amount.toFixed(2)}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => { data.item.qty > 1 ? changeQty({ key: data.item.key, type: 'reduce' }) : null }}
                                    style={{ ...styles.addRemoveButtonStyle }}
                                >
                                    <MaterialIcons name='remove' color={Colors.blackColor} size={16} />
                                </TouchableOpacity>
                                <Text style={{ marginHorizontal: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Bold }}>
                                    {data.item.qty}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => { changeQty({ key: data.item.key, type: 'add' }) }}
                                    style={{ ...styles.addRemoveButtonStyle }}
                                >
                                    <MaterialIcons name='add' color={Colors.blackColor} size={16} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );

        return (
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-90}
                onSwipeValueChange={onSwipeValueChange}
                useNativeDriver={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 5.0, }}
                ListFooterComponent={totalInfo()}
            />
        )
    }

    function snackBarInfo() {
        return (
            <Snackbar
                elevation={0}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Item Removed From Cart
                </Text>
            </Snackbar>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    My Cart
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default CartScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    deleteIconWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        top: 0,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 90,
    },
    addRemoveButtonStyle: {
        backgroundColor: Colors.bodyBackColor,
        width: 26.0,
        height: 26.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center', justifyContent: 'center'
    },
    itemWrapStyle: {
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding
    },
    deleteCircleStyle: {
        backgroundColor: Colors.redColor,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        shadowColor: Colors.redColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center'
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
    dialogStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        padding: 0.0,
        width: '80%',
        maxHeight: '80%'
    },
    prescriptionImageStyle: {
        width: '100%',
        height: width / 2.5,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
})