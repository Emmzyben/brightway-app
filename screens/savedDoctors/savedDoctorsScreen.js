import { StyleSheet, Animated, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { showRating } from '../../components/showRatings';

const { width } = Dimensions.get('window');

const savedDoctorsList = [
    {
        key: '1',
        doctorImage: require('../../assets/images/doctors/doctor1.png'),
        doctorName: 'Dr. Ismail Sendi',
        rating: 4.0,
        ratingCount: 152,
        hospitalName: 'Apple Hospital',
        post: 'Gastroenterologist',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.purpleColor,
    },
    {
        key: '2',
        doctorImage: require('../../assets/images/doctors/doctor2.png'),
        doctorName: 'Dr. Barry George',
        rating: 4.0,
        ratingCount: 152,
        hospitalName: 'Mayo Clinic',
        post: 'Neurologist',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.blueColor,
    },
    {
        key: '3',
        doctorImage: require('../../assets/images/doctors/doctor3.png'),
        doctorName: 'Dr. Carol Pollack',
        rating: 4.0,
        ratingCount: 152,
        hospitalName: 'Apple Hospital',
        post: 'Nephrologist',
        experienceInYear: 15,
        fees: 30,
        bgColor: Colors.cyanColor,
    },
];

const rowSwipeAnimatedValues = {};

Array(savedDoctorsList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const SavedDoctorsScreen = ({ navigation }) => {

    const [listData, setListData] = useState(savedDoctorsList);
    const [showSnackBar, setShowSnackBar] = useState(false)

    return (
        <>
            {doctorsInfo()}
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

    function doctorsInfo() {
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
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('DoctorDetail') }}
                    style={styles.docorInfoWrapStyle}
                >
                    <View style={{ backgroundColor: data.item.bgColor, ...styles.doctorImageBackgroundStyle, }}>
                        <Image
                            source={data.item.doctorImage}
                            style={styles.doctorImageStyle}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                                {data.item.doctorName}
                            </Text>
                            <View style={{ marginLeft: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}>
                                {showRating({ number: data.item.rating })}
                                <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor11SemiBold }}>
                                    ({data.item.ratingCount})
                                </Text>
                            </View>
                        </View>
                        <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                            {data.item.post}
                            <Text style={{ ...Fonts.lightGrayColor14Regular }}>
                                { } at { }
                            </Text>
                            {data.item.hospitalName}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text numberOfLines={1} style={{ maxWidth: width / 3.45, }} >
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    Exp: { }
                                </Text>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    {data.item.experienceInYear} years
                                </Text>
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium, color: Colors.lightGrayColor }}>
                                { }  •  { }
                            </Text>
                            <Text numberOfLines={1} style={{ maxWidth: width / 3.45, }}>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    Fees: { }
                                </Text>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    {`$`}{data.item.fees}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

        return (
            listData.length == 0
                ?
                noSavedDoctorsInfo()
                :
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-90}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                />
        )
    }

    function noSavedDoctorsInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="doctor" size={40} color={Colors.lightGrayColor} />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor16SemiBold }}>
                    Not Any Doctor Available
                </Text>
            </View>
        )
    }
}

export default SavedDoctorsScreen

const styles = StyleSheet.create({
    docorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 8.0,
        paddingTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 4.5,
        width: width / 4.7,
        alignItems: 'center',
    },
    doctorImageStyle: {
        width: (width / 4.7) - 15.0,
        height: '115%',
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
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