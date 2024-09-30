import { StyleSheet, Animated, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { showRating } from '../../components/showRatings';

const { width } = Dimensions.get('window');

const savedHospitalsList = [
    {
        key: '1',
        hospitalName: 'Mayo Clinic Scottsdale AZ',
        hospitalCategory: 'General Hospital',
        rating: 5.0,
        address: '83 Woodhedge Drive, Nottingham',
        hospitalImages: [
            require('../../assets/images/hospitals/hospital1.png'),
            require('../../assets/images/hospitals/hospital2.png'),
            require('../../assets/images/hospitals/hospital3.png'),
            require('../../assets/images/hospitals/hospital4.png'),
            require('../../assets/images/hospitals/hospital5.png'),
        ],
    },
    {
        key: '2',
        hospitalName: 'Johns Hopkins Hospital',
        hospitalCategory: 'General Hospital',
        rating: 5.0,
        address: 'Ridgeline Commercial Complex',
        hospitalImages: [
            require('../../assets/images/hospitals/hospital6.png'),
            require('../../assets/images/hospitals/hospital7.png'),
            require('../../assets/images/hospitals/hospital8.png'),
            require('../../assets/images/hospitals/hospital9.png'),
            require('../../assets/images/hospitals/hospital10.png'),
        ],
    },
    {
        key: '3',
        hospitalName: 'Cleveland Hospital',
        hospitalCategory: 'General Hospital',
        rating: 5.0,
        address: 'W. Gray St. Utica, Pennsylvania',
        hospitalImages: [
            require('../../assets/images/hospitals/hospital1.png'),
            require('../../assets/images/hospitals/hospital2.png'),
            require('../../assets/images/hospitals/hospital3.png'),
            require('../../assets/images/hospitals/hospital4.png'),
            require('../../assets/images/hospitals/hospital5.png'),
        ],
    },
    {
        key: '4',
        hospitalName: 'St Jude Children\'s Hospital',
        hospitalCategory: 'General Hospital',
        rating: 5.0,
        address: 'Elgin St. Celina, Delaware 10299',
        hospitalImages: [
            require('../../assets/images/hospitals/hospital6.png'),
            require('../../assets/images/hospitals/hospital7.png'),
            require('../../assets/images/hospitals/hospital8.png'),
            require('../../assets/images/hospitals/hospital9.png'),
            require('../../assets/images/hospitals/hospital10.png'),
        ],
    },
];

const rowSwipeAnimatedValues = {};

Array(savedHospitalsList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const SavedHospitalsScreen = ({navigation}) => {

    const [hospitalData, setHospitalData] = useState(savedHospitalsList);
    const [showSnackBar, setShowSnackBar] = useState(false)

    return (
        <>
            {hospitalsInfo()}
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

    function hospitalsInfo() {
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
            const newData = [...hospitalData];
            const prevIndex = hospitalData.findIndex(item => item.key === rowKey);
            newData.splice(prevIndex, 1);
            setShowSnackBar(true);
            setHospitalData(newData);
        };

        const onSwipeValueChange = swipeData => {
            const { key, value } = swipeData;
            rowSwipeAnimatedValues[key].setValue(Math.abs(value));
        };

        const renderItem = data => (
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('HospitalDetail') }}
                    style={styles.hospitalInfoWrapStyle}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0, }}>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                                {data.item.hospitalName}
                            </Text>
                            <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                                {data.item.hospitalCategory}
                            </Text>
                            {showRating({ number: data.item.rating })}
                        </View>
                        <View style={{ flex: 0.35, }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {
                                    data.item.hospitalImages.map((image, index) => (
                                        <Image
                                            key={`${index}`}
                                            source={image}
                                            style={styles.hospitalImagesStyle}
                                        />
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.hospitalLocationAndCallInfoWrapStyle}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name='location-pin'
                                color={Colors.lightGrayColor}
                                size={16.0}
                            />
                            <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                                {data.item.address}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Sizes.fixPadding - 5.0, }}>
                            <MaterialIcons
                                name='call'
                                color={Colors.primaryColor}
                                size={15.0}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.primaryColor12Bold }}>
                                Call Now
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );

        return (
            hospitalData.length == 0
                ?
                noSavedHospitalInfo()
                :
                <SwipeListView
                    data={hospitalData}
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

    function noSavedHospitalInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="hospital-building" size={40} color={Colors.lightGrayColor} />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor16SemiBold }}>
                    No Any Hospital Available
                </Text>
            </View>
        )
    }
}

export default SavedHospitalsScreen

const styles = StyleSheet.create({
    hospitalImagesStyle: {
        alignSelf: 'center',
        width: width / 4.0,
        height: 50.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginRight: Sizes.fixPadding,
    },
    hospitalLocationAndCallInfoWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Sizes.fixPadding * 2.0
    },
    hospitalInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding,
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