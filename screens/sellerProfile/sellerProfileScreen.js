import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
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

const SellerProfileScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {medicinesInfo()}
            </View>
        </View>
    )

    function medicinesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('MedicineDetail') }}
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
                <View style={{ flexDirection: 'row', }}>
                    <Text style={styles.amountTextStyle}>
                        ${item.amount.toFixed(2)}
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
        )
        return (
            <FlatList
                data={medicinesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, paddingBottom: Sizes.fixPadding }}
                ListHeaderComponent={sellerProfile()}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function sellerProfile() {
        return (
            <View style={styles.sellerProfileWrapStyle}>
                <Image
                    source={require('../../assets/images/seller/seller1.png')}
                    style={{ width: width / 3.8, height: width / 3.8, borderRadius: Sizes.fixPadding - 5.0 }}
                />
                <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1, }}>
                    <Text style={{ ...Fonts.blackColor17SemiBold }}>
                        Omnicare Store
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name='location-pin' color={Colors.lightGrayColor} size={15} />
                        <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor15Medium }}>
                            83 Woodhedge Drive
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, justifyContent: 'center', padding: Sizes.fixPadding * 2.0, }}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => { navigation.pop() }}
                    style={{ alignSelf: 'flex-start' }}
                />
            </View>
        )
    }
}

export default SellerProfileScreen

const styles = StyleSheet.create({
    sellerProfileWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        marginHorizontal: -Sizes.fixPadding,
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
        marginHorizontal: Sizes.fixPadding
    },
    addButtonStyle: {
        backgroundColor: Colors.primaryColor,
        padding: Sizes.fixPadding - 3.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding
    }
})