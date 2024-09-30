import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { TabView, TabBar } from 'react-native-tab-view';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const firstAidMedicineList = [
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

const healthCareMedicineList = [
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
        id: '1',
        medicineImage: require('../../assets/images/medicines/medicine1.png'),
        medicineName: 'Azithral 500',
        medicineType: 'Tablet',
        amount: 3.50,
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

const othersMedicineList = [
    {
        id: '7',
        medicineImage: require('../../assets/images/medicines/medicine7.png'),
        medicineName: 'Non Drosy Lartin',
        medicineType: 'Tablet',
        amount: 3.00,
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
        id: '4',
        medicineImage: require('../../assets/images/medicines/medicine4.png'),
        medicineName: 'Almox 500',
        medicineType: 'Capsule',
        amount: 4.00,
        prescriptionable: true,
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
        id: '1',
        medicineImage: require('../../assets/images/medicines/medicine1.png'),
        medicineName: 'Azithral 500',
        medicineType: 'Tablet',
        amount: 3.50,
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
        id: '12',
        medicineImage: require('../../assets/images/medicines/medicine4.png'),
        medicineName: 'Almox 500',
        medicineType: 'Capsule',
        amount: 4.00,
        prescriptionable: true,
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
        id: '10',
        medicineImage: require('../../assets/images/medicines/medicine2.png'),
        medicineName: 'Xencial 120mg',
        medicineType: 'Tablet',
        amount: 2.50,
        prescriptionable: false,
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

const ShopByCategoryScreen = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First Aid' },
        { key: 'second', title: 'Health Care' },
        { key: 'third', title: 'Others' },
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

    function tabs() {
        const renderScene = ({ route, jumpTo }) => {
            switch (route.key) {
                case 'first':
                    return medicinesInfo({ medicines: firstAidMedicineList })
                case 'second':
                    return medicinesInfo({ medicines: healthCareMedicineList })
                case 'third':
                    return medicinesInfo({ medicines: othersMedicineList });
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

    function medicinesInfo({ medicines }) {
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
                data={medicines}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ padding: Sizes.fixPadding }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Shop by Category
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default ShopByCategoryScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginHorizontal: Sizes.fixPadding
    },
    addButtonStyle: {
        backgroundColor: Colors.primaryColor,
        padding: Sizes.fixPadding - 3.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding
    }
})