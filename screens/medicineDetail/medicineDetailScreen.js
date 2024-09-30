import {  StyleSheet, Text, View,  Dimensions, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes,CommonStyles } from '../../constants/styles'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { Snackbar } from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const { height, width } = Dimensions.get('window');

const productDetails = [
    {
        id: '1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac sit ipsum eget sit. Eget nunc, ut in in ultricies.',
        descriptionDetails: [
            'Mauris sem mauris urna ipsum quis est turpis.',
            'Bibendum faucibus tellus dignissim elementum.',
        ],
    },
    {
        id: '2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac sit ipsum eget sit. Eget nunc, ut in in ultricies.',
    },
    {
        id: '3',
        description: 'Mauris sem mauris urna ipsum quis est turpis. Pretium nec at elementum purus duis adipiscing interdum matt.Sed mi feugiat a neque dictum dictumst. Euismod eliit semper nisl malesuada duis sit sapien nisl.',
        descriptionDetails: [
            'Mauris sem mauris urna ipsum quis est turpis.',
            'Bibendum faucibus tellus dignissim elementum.',
            'Elit vulputate diam tellus quam arcu pulvinar.',
            'Sit volutpat tellus neque ornare fames eu.'
        ],
    }
];

const MedicineDetailScreen = ({ navigation }) => {

    const [inSaved, setinSaved] = useState(false);
    const [showSnackBar, setshowSnackBar] = useState(false);
    const [itemCount, setitemCount] = useState(1);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <CollapsibleToolbar
                renderContent={pageContent}
                renderNavBar={header}
                renderToolBar={medicineImage}
                collapsedNavBarBackgroundColor={Colors.primaryColor}
                translucentStatusBar={false}
                toolBarHeight={height / 3.2}
                showsVerticalScrollIndicator={false}
            />
            {addToCartButton()}
            {snackBar()}
        </View>
    )

    function addToCartButton() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('Cart') }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                elevation={0.0}
                onDismiss={() => { setshowSnackBar(false) }}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {inSaved ? 'Added To Saved' : 'Removed From Saved'}
                </Text>
            </Snackbar>
        )
    }

    function pageContent() {
        return (
            <View style={{ flex: 1 }}>
                {medicineInfo()}
                {productDetail()}
            </View>
        )
    }

    function productDetail() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, marginVertical: Sizes.fixPadding, padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Product Details
                </Text>
                {
                    productDetails.map((item) => (
                        <View key={`${item.id}`}>
                            <Text style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding - 5.0 }}>
                                {item.description}
                            </Text>
                            {
                                item.descriptionDetails
                                    ?
                                    <View style={{ marginHorizontal: Sizes.fixPadding }}>
                                        {
                                            item.descriptionDetails.map((detail, index) => (
                                                <View
                                                    key={`${index}`}
                                                    style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding - 5.0 }}
                                                >
                                                    <Text style={{ ...Fonts.grayColor14Medium }}>
                                                        •
                                                    </Text>
                                                    <Text style={{ ...Fonts.grayColor14Medium, marginLeft: Sizes.fixPadding - 5.0 }}                                                    >
                                                        {detail}
                                                    </Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    ))
                }
            </View>
        )
    }

    function medicineInfo() {
        return (
            <View style={styles.medicineInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor17SemiBold }}>
                    Azithral 500 Tablet
                </Text>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.grayColor14SemiBold }}>
                    Health Care
                </Text>
                <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                    Alembic Pharmaceuticals Ltd
                </Text>
                <View style={styles.amountAndAddRemoveIconWrapStyle}>
                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                        $3.50
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { itemCount > 1 ? setitemCount(itemCount - 1) : null }}
                            style={styles.addRemoveButtonWrapStyle}
                        >
                            <MaterialIcons
                                name='remove'
                                color={Colors.blackColor}
                                size={18}
                            />
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Bold }}>
                            {itemCount}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setitemCount(itemCount + 1)}
                            style={styles.addRemoveButtonWrapStyle}
                        >
                            <MaterialIcons
                                name='add'
                                color={Colors.blackColor}
                                size={18}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function medicineImage() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, height: height / 3.2, justifyContent: 'flex-end' }}>
                <View>
                    <Image
                        source={require('../../assets/images/medicines/medicine1.png')}
                        style={styles.medicineImageStyle}
                        resizeMode="contain"
                    />
                    <MaterialCommunityIcons
                        name='prescription'
                        color={Colors.primaryColor}
                        size={24}
                        style={{ position: 'absolute', right: 20.0, top: 20.0, }}
                    />
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} onPress={() => navigation.pop()} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name={inSaved ? "bookmark" : "bookmark-outline"}
                        size={22}
                        color={Colors.blackColor}
                        onPress={() => {
                            setinSaved(!inSaved)
                            setshowSnackBar(true)
                        }}
                    />
                    <MaterialIcons
                        name="shopping-cart"
                        size={22}
                        color={Colors.blackColor}
                        style={{ marginLeft: Sizes.fixPadding + 5.0 }}
                        onPress={() => { }}
                    />
                </View>
            </View>
        )
    }
}

export default MedicineDetailScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Platform.OS == 'ios' ? Sizes.fixPadding - 8.0 : Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    addRemoveButtonWrapStyle: {
        width: 26.0,
        height: 26.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.bodyBackColor,
        alignItems: 'center', justifyContent: 'center'
    },
    amountAndAddRemoveIconWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    medicineImageStyle: {
        height: width / 2.0,
        width: width / 2.0,
        resizeMode: 'contain',
        alignSelf: 'center'
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
        ...CommonStyles.buttonShadow,
    },
    medicineInfoWrapStyle: {
        paddingTop: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    }
})