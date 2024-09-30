import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes ,CommonStyles} from '../../constants/styles';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const addressesList = [
    {
        id: '1',
        addressType: 'Home',
        address: 'Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX',
    },
    {
        id: '2',
        addressType: 'Office',
        address: 'Unit 500, Montford Court, Montford Street, Salford, M50 2QP',
    },
    {
        id: '3',
        addressType: 'Other',
        address: '2 Council House, Fenside Road, Toynton All Saints, PE23 5DE',
    },
];

const SavedAddressesScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {addresses()}
            </View>
            {addNewAddressButton()}
        </View>
    )

    function addNewAddressButton() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('AddNewAddress') }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Add New Address
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function addresses() {
        const renderItem = ({ item }) => (
            <View style={styles.addressWrapStyle}>
                <MaterialCommunityIcons
                    name={item.addressType == 'Home' ? 'home' : item.addressType == 'Office' ? 'office-building' : 'map-marker'}
                    size={20}
                    color={Colors.primaryColor}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {item.addressType}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                        {item.address}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                data={addressesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Saved Addresses
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default SavedAddressesScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    addressWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        padding: Sizes.fixPadding * 2.0,
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
})