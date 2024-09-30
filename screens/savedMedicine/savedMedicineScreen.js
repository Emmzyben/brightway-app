import { StyleSheet, Animated, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const savedMedicinesList = [
    {
        key: '1',
        medicineImage: require('../../assets/images/medicines/medicine1.png'),
        medicineName: 'Azithral 500',
        medicineType: 'Tablet',
        amount: 3.50,
        prescriptionable: true,
    },
    {
        key: '2',
        medicineImage: require('../../assets/images/medicines/medicine2.png'),
        medicineName: 'Xencial 120mg',
        medicineType: 'Tablet',
        amount: 2.50,
        prescriptionable: false,
    },

    {
        key: '3',
        medicineImage: require('../../assets/images/medicines/medicine4.png'),
        medicineName: 'Almox 500',
        medicineType: 'Capsule',
        amount: 4.00,
        prescriptionable: true,
    },
    {
        key: '4',
        medicineImage: require('../../assets/images/medicines/medicine7.png'),
        medicineName: 'Non Drosy Lartin',
        medicineType: 'Tablet',
        amount: 3.00,
        prescriptionable: true,
    },
    {
        key: '5',
        medicineImage: require('../../assets/images/medicines/medicine8.png'),
        medicineName: 'Angispan - TR',
        medicineType: '2.5mg Capsule',
        amount: 3.50,
        prescriptionable: true,
    },
    {
        key: '6',
        medicineImage: require('../../assets/images/medicines/medicine3.png'),
        medicineName: 'Ascoril D Plus ',
        medicineType: 'Sugar Free Syrup',
        amount: 3.00,
        prescriptionable: true,
    },
];

const rowSwipeAnimatedValues = {};

Array(savedMedicinesList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const SavedMedicineScreen = ({ navigation }) => {

    const [listData, setListData] = useState(savedMedicinesList);
    const [showSnackBar, setShowSnackBar] = useState(false)

    return (
        <>
            {medicinesInfo()}
            {snackBarInfo()}
        </>
    )

    function snackBarInfo() {
        return (
            <Snackbar
                elevation={0}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Removed From Saved
                </Text>
            </Snackbar>
        )
    }

    function medicinesInfo() {
        const closeRow = (rowMap, rowKey) => {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
            }
        };

        const renderHiddenItem = (data, rowMap, rowKey) => (
            <View style={{ alignItems: 'center', flex: 1 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ ...styles.deleteIconWrapStyle, right: 0 }}
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
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('MedicineDetail') }}
                    style={styles.medicineInfoWrapStyle}
                >
                    {
                        data.item.prescriptionable
                            ?
                            <MaterialCommunityIcons
                                name="prescription"
                                size={24}
                                color={Colors.primaryColor}
                                style={styles.prescriptionIconStyle}
                            />
                            :
                            null
                    }
                    <Image
                        source={data.item.medicineImage}
                        style={styles.medicineImageStyle}
                    />
                    <View style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding + 8.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {data.item.medicineName}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {data.item.medicineType}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.amountTextStyle}>
                            ${data.item.amount.toFixed(2)}
                        </Text>
                        <View style={styles.addButtonStyle}>
                            <MaterialIcons
                                name='add'
                                color={Colors.whiteColor}
                                size={20}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

        return (
            listData.length == 0
                ?
                noSavedMedicinesInfo()
                :
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-90}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
                    numColumns={2}
                />
        )
    }

    function noSavedMedicinesInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="pill" size={40} color={Colors.lightGrayColor} />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor16SemiBold }}>
                    No Any Medicine Available
                </Text>
            </View>
        )
    }
}

export default SavedMedicineScreen

const styles = StyleSheet.create({
    medicineInfoWrapStyle: {
        margin: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        width: width / 2.4,
    },
    prescriptionIconStyle: {
        position: 'absolute',
        right: 0.0,
        margin: Sizes.fixPadding,
        alignSelf: 'flex-end'
    },
    medicineImageStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        width: width / 3.0,
        height: width / 6.5,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginHorizontal: Sizes.fixPadding
    },
    amountTextStyle: {
        marginTop: Sizes.fixPadding - 7.0,
        flex: 1,
        ...Fonts.blackColor15Bold,
        marginHorizontal: Sizes.fixPadding
    },
    addButtonStyle: {
        backgroundColor: Colors.primaryColor,
        padding: Sizes.fixPadding - 3.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding
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
    deleteIconWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        top: 0,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 90,
    },
})