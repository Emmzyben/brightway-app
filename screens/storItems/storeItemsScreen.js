import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const medicinesList = [
    {
        id: '1',
        medicineImage: require('../../assets/images/medicines/medicine1.png'),
        medicineName: 'Azithral 500',
        medicineType: 'Tablet',
        amount: 3.50,
        prescriptionable: true,
    },
    {
        id: '2',
        medicineImage: require('../../assets/images/medicines/medicine2.png'),
        medicineName: 'Xencial 120mg',
        medicineType: 'Tablet',
        amount: 2.50,
        prescriptionable: false,
    },
    {
        id: '3',
        medicineImage: require('../../assets/images/medicines/medicine3.png'),
        medicineName: 'Ascoril D Plus Syrup',
        medicineType: 'Sugar Free',
        amount: 3.00,
        prescriptionable: true,
    },
    {
        id: '4',
        medicineImage: require('../../assets/images/medicines/medicine4.png'),
        medicineName: 'Almox 500',
        medicineType: 'Capsule',
        amount: 4.00,
        prescriptionable: true,
    },
    {
        id: '5',
        medicineImage: require('../../assets/images/medicines/medicine5.png'),
        medicineName: 'Allergy Relief',
        medicineType: 'Topcare Tablet',
        amount: 3.50,
        prescriptionable: false,
    },
    {
        id: '6',
        medicineImage: require('../../assets/images/medicines/medicine6.png'),
        medicineName: 'Coricidin 100mg ',
        medicineType: 'Tablet',
        amount: 3.00,
        prescriptionable: true,
    },
    {
        id: '7',
        medicineImage: require('../../assets/images/medicines/medicine7.png'),
        medicineName: 'Non Drosy Lartin',
        medicineType: 'Tablet',
        amount: 3.00,
        prescriptionable: true,
    },
    {
        id: '8',
        medicineImage: require('../../assets/images/medicines/medicine8.png'),
        medicineName: 'Angispan - TR',
        medicineType: '2.5mg Capsule',
        amount: 3.50,
        prescriptionable: true,
    },
    {
        id: '9',
        medicineImage: require('../../assets/images/medicines/medicine1.png'),
        medicineName: 'Azithral 500',
        medicineType: 'Tablet',
        amount: 3.50,
        prescriptionable: true,
    },
    {
        id: '10',
        medicineImage: require('../../assets/images/medicines/medicine2.png'),
        medicineName: 'Xencial 120mg',
        medicineType: 'Tablet',
        amount: 2.50,
        prescriptionable: false,
    },
    {
        id: '11',
        medicineImage: require('../../assets/images/medicines/medicine3.png'),
        medicineName: 'Ascoril D Plus Syrup',
        medicineType: 'Sugar Free',
        amount: 3.00,
        prescriptionable: false,
    },
    {
        id: '12',
        medicineImage: require('../../assets/images/medicines/medicine4.png'),
        medicineName: 'Almox 500',
        medicineType: 'Capsule',
        amount: 4.00,
        prescriptionable: true,
    },
    {
        id: '13',
        medicineImage: require('../../assets/images/medicines/medicine5.png'),
        medicineName: 'Allergy Relief',
        medicineType: 'Topcare Tablet',
        amount: 3.50,
        prescriptionable: true,
    },
    {
        id: '14',
        medicineImage: require('../../assets/images/medicines/medicine6.png'),
        medicineName: 'Coricidin 100mg ',
        medicineType: 'Tablet',
        amount: 3.00,
        prescriptionable: false,
    },
    {
        id: '15',
        medicineImage: require('../../assets/images/medicines/medicine7.png'),
        medicineName: 'Non Drosy Lartin',
        medicineType: 'Tablet',
        amount: 3.00,
        prescriptionable: false,
    },
    {
        id: '16',
        medicineImage: require('../../assets/images/medicines/medicine8.png'),
        medicineName: 'Angispan - TR',
        medicineType: '2.5mg Capsule',
        amount: 3.50,
        prescriptionable: true,
    },
];

const StoreItemsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {medicinesInfo()}
                {addIcon()}
            </View>
        </View>
    )

    function addIcon() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('AddNewItem') }}
                style={styles.addButtonStyle}
            >
                <MaterialIcons
                    name='add'
                    color={Colors.whiteColor}
                    size={30}
                />
            </TouchableOpacity>
        )
    }

    function medicinesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('EditItem') }}
                style={styles.medicineInfoWrapStyle}
            >
                {
                    item.prescriptionable
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
                    source={item.medicineImage}
                    style={styles.medicineImageStyle}
                />
                <View style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding + 8.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                        {item.medicineName}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                        {item.medicineType}
                    </Text>
                </View>
                <Text style={styles.amountTextStyle}>
                    ${item.amount.toFixed(2)}
                </Text>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={medicinesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, paddingBottom: Sizes.fixPadding }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} onPress={() => { navigation.pop() }} />
                <Text numberOfLines={1} style={{ flex: 1, textAlign: 'center', ...Fonts.blackColor20Bold }}>
                    Store Items
                </Text>
                <MaterialIcons name="search" size={24} color={Colors.blackColor} onPress={() => { }} />
            </View>
        )
    }
}

export default StoreItemsScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        padding: Sizes.fixPadding * 2.0,
    },
    medicineInfoWrapStyle: {
        flex: 1,
        margin: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        maxWidth: width / 2.4,
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
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    addButtonStyle: {
        position: 'absolute',
        bottom: 20.0,
        right: 20.0,
        elevation: 2.0,
        shadowColor: Colors.primaryColor,
        backgroundColor: Colors.primaryColor,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
        ...CommonStyles.buttonShadow,
        elevation: 3.0
    }
})