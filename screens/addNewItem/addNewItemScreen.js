import { StyleSheet, Text, View, Dimensions, Modal, TextInput, ScrollView, TouchableOpacity, Platform, } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles';
import { Menu } from 'react-native-material-menu';
import MyStatusBar from '../../components/myStatusBar';

const { width, height } = Dimensions.get('window');

const categoriesList = [
    'OTC Medicines',
    'Health Care Prodcuts',
    'Antiemetics',
    'Prescription only Medicines',
    'Nonpreferred Drug',
    'Decongestants',
    'Vitamins'
];

const AddNewItemScreen = ({ navigation }) => {

    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [productId, setproductId] = useState('');
    const [productName, setproductName] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [category, setcategory] = useState('');
    const [subCategory, setsubCategory] = useState('');
    const [showCategoryMenu, setshowCategoryMenu] = useState(false);
    const [showsubCategoryMenu, setshowsubCategoryMenu] = useState(false);
    const [aboutProduct, setaboutProduct] = useState('')
    const [prescriptionUploaded, setprescriptionUploaded] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 9.0, }}>
                    {productInfo()}
                    {productCategoryInfo()}
                    {aboutProductInfo()}
                    {prescriptionUploadedInfo()}
                </ScrollView>
                {addItemButton()}
            </View>
            {changeImageOptionsSheet()}
        </View>
    )

    function addItemButton() {
        return (
            <View style={{}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.pop() }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Bold }}>
                        Add Item
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function prescriptionUploadedInfo() {
        return (
            <View style={styles.prescriptionUploadedInfoWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="prescription" size={28} color={Colors.primaryColor} />
                    <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}>
                        Prescription Uploaded
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setprescriptionUploaded(!prescriptionUploaded) }}
                    style={{
                        ...styles.switchStyle,
                        backgroundColor: prescriptionUploaded ? Colors.primaryColor : Colors.lightGrayColor,
                        alignItems: prescriptionUploaded ? 'flex-end' : 'flex-start'
                    }}
                >
                    <View style={{ backgroundColor: prescriptionUploaded ? Colors.whiteColor : Colors.whiteColor, ...styles.switchIndicatorStyle }} />
                </TouchableOpacity>
            </View>
        )
    }

    function aboutProductInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, marginVertical: Sizes.fixPadding, padding: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                    About Product
                </Text>
                <TextInput
                    value={aboutProduct}
                    onChangeText={(value) => { setaboutProduct(value) }}
                    style={{
                        ...styles.textFieldStyle,
                        height: Platform.OS == 'ios' ? 100 : null,
                        paddingTop: Platform.OS == 'ios' ? Sizes.fixPadding : null
                    }}
                    numberOfLines={4}
                    multiline
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    placeholder='Write here...'
                    placeholderTextColor={Colors.grayColor}
                    textAlignVertical='top'
                />
            </View>
        )
    }

    function productCategoryInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, }}>
                <View style={{ marginBottom: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                        Product Category
                    </Text>
                    <Menu
                        visible={showCategoryMenu}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { setshowCategoryMenu(true) }}
                                style={styles.dropDownInfoWrapStyle}
                            >
                                <Text style={{ flex: 1, ...Fonts.blackColor16Medium, color: category ? Colors.blackColor : Colors.grayColor }}>
                                    {category ? category : 'Select product category'}
                                </Text>
                                <MaterialIcons name="arrow-drop-down" size={24} color={Colors.grayColor} />
                            </TouchableOpacity>
                        }
                        onRequestClose={() => { setshowCategoryMenu(false) }}
                    >
                        <View style={styles.dropDownMenuStyle}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 3.0, }}>
                                {
                                    categoriesList.map((item, index) => (
                                        <Text
                                            key={`${index}`}
                                            onPress={() => { setcategory(item), setshowCategoryMenu(false) }}
                                            style={{ marginVertical: Sizes.fixPadding - 3.0, ...Fonts.blackColor16Medium }}
                                        >
                                            {item}
                                        </Text>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </Menu>
                </View>
                <View>
                    <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                        Sub Category
                    </Text>
                    <Menu
                        visible={showsubCategoryMenu}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { setshowsubCategoryMenu(true) }}
                                style={styles.dropDownInfoWrapStyle}
                            >
                                <Text style={{ flex: 1, ...Fonts.blackColor16Medium, color: subCategory ? Colors.blackColor : Colors.grayColor }}>
                                    {subCategory ? subCategory : 'Select product sub category'}
                                </Text>
                                <MaterialIcons name="arrow-drop-down" size={24} color={Colors.grayColor} />
                            </TouchableOpacity>
                        }
                        onRequestClose={() => { setshowsubCategoryMenu(false) }}
                    >
                        <View style={styles.dropDownMenuStyle}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 3.0, }}>
                                {
                                    categoriesList.map((item, index) => (
                                        <Text
                                            key={`${index}`}
                                            onPress={() => { setsubCategory(item), setshowsubCategoryMenu(false) }}
                                            style={{ marginVertical: Sizes.fixPadding - 3.0, ...Fonts.blackColor16Medium }}
                                        >
                                            {item}
                                        </Text>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </Menu>
                </View>
            </View>
        )
    }

    function productPriceInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}>
                    Product Price
                </Text>
                <TextInput
                    value={productPrice}
                    onChangeText={(value) => setproductPrice(value)}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    placeholder="Enter price"
                    placeholderTextColor={Colors.grayColor}
                    keyboardType='number-pad'
                />
            </View>
        )
    }

    function productNameInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}>
                    Product Name
                </Text>
                <TextInput
                    value={productName}
                    onChangeText={(value) => setproductName(value)}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    placeholder='Enter name'
                    placeholderTextColor={Colors.grayColor}
                />
            </View>
        )
    }

    function productIdInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding }}>
                    Product ID
                </Text>
                <TextInput
                    value={productId}
                    onChangeText={(value) => setproductId(value)}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    placeholder='Enter id'
                    placeholderTextColor={Colors.grayColor}
                />
            </View>
        )
    }

    function changeImageOptionsSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showBottomSheet}
                onRequestClose={() => { setShowBottomSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowBottomSheet(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={styles.bottomSheetStyle}>
                                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                                    Choose Option
                                </Text>
                                <View style={{ marginTop: Sizes.fixPadding * 2.5, flexDirection: 'row', }}>
                                    {changeImageOptionsSort({ bgColor: '#009688', icon: 'camera', option: 'Camera' })}
                                    <View style={{ marginHorizontal: Sizes.fixPadding * 3.0, }}>
                                        {changeImageOptionsSort({ bgColor: '#00A7F7', icon: 'image', option: 'Gallery' })}
                                    </View>
                                    {changeImageOptionsSort({ bgColor: '#DD5A5A', icon: 'delete', option: 'Remove photo' })}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function changeImageOptionsSort({ bgColor, icon, option }) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => { setShowBottomSheet(false) }}>
                <View style={{ ...styles.changeImageOptionsIconWrapStyle, backgroundColor: bgColor, }}>
                    <MaterialCommunityIcons name={icon} size={24} color={Colors.whiteColor} />
                </View>
                <Text style={styles.imageOptionTextStyle}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function productInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: width / 2.5, height: width / 3.5, backgroundColor: Colors.bodyBackColor, }}>

                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding + 8.0, alignSelf: 'flex-end' }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { setShowBottomSheet(true) }}
                            style={styles.cameraIconWrapStyle}
                        >
                            <MaterialIcons
                                name='camera-alt'
                                color={Colors.primaryColor}
                                size={14}
                            />
                        </TouchableOpacity>
                        <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.primaryColor13SemiBold }}>
                            Upload Image
                        </Text>
                    </View>
                </View>
                {productIdInfo()}
                {productNameInfo()}
                {productPriceInfo()}
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Store Items
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default AddNewItemScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    cameraIconWrapStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    changeImageOptionsIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.5,
    },
    imageOptionTextStyle: {
        textAlign: 'center',
        maxWidth: width / 4.5,
        marginTop: Sizes.fixPadding - 5.0,
        ...Fonts.grayColor14Medium
    },
    cameraIconWrapStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 }
    },
    textFieldStyle: {
        backgroundColor: Colors.bodyBackColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Platform.OS == 'ios' ? Sizes.fixPadding + 5.0 : Sizes.fixPadding + 2.0,
        ...Fonts.blackColor16Medium,
    },
    dropDownInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.bodyBackColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 4.0,
    },
    dropDownMenuStyle: {
        elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        maxHeight: height - 150,
        backgroundColor: Colors.whiteColor,
        width: width - 50,
    },
    switchStyle: {
        width: 30.0,
        height: 15.0,
        borderRadius: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
    },
    switchIndicatorStyle: {
        marginHorizontal: Sizes.fixPadding - 8.0,
        width: 11.0,
        height: 11.0,
        borderRadius: 5.5,
    },
    prescriptionUploadedInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 8.0,
        elevation: 1.0,
        ...CommonStyles.buttonShadow,
        position: 'absolute',
        bottom: 20.0,
        left: 20.0,
        right: 20.0,
    },
})