import { StyleSheet, Text, Animated, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useRef, createRef, useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../constants/styles'
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons'
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');
const cardWidth = width / 1.4;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const hospitalsList = [
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486,
        },
        id: '1',
        hospitalName: 'Mayo Clinic Scottsdale AZ',
        hospitalCategory: 'General Hospital',
        address: '83 Woodhedge Drive,Nottingham',
    },
    {
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279,
        },
        id: '2',
        hospitalName: 'Johns Hopkins Hosptial',
        hospitalCategory: 'General Hospital',
        address: 'Ridgeline Commercial Complex',
    },
    {
        coordinate: {
            latitude: 22.6281662,
            longitude: 88.4410113,
        },
        id: '3',
        hospitalName: 'Cleveland Hospital',
        hospitalCategory: 'General Hospital',
        address: 'W. Gray St. Utica, Pennsylvania',
    },
    {
        coordinate: {
            latitude: 22.6341137,
            longitude: 88.4497463,
        },
        id: '4',
        hospitalName: 'St Jude Children\'s Hospital',
        hospitalCategory: 'General Hospital',
        address: 'Elgin St. Celina, Delaware 10299',
    },
    {
        coordinate: {
            latitude: 22.618100,
            longitude: 88.456747,
        },
        id: '5',
        hospitalName: 'Cleveland Hospital',
        hospitalCategory: 'General Hospital',
        address: 'Preston Rd. Inglewood, Maine 98380',
    },
    {
        coordinate: {
            latitude: 22.640124,
            longitude: 88.438968,
        },
        id: '6',
        hospitalName: 'Apple Hospital',
        hospitalCategory: 'General Hospital',
        address: 'Westheimer Rd. Santa Ana, Illinois',
    },
];

const NearestHospitalScreen = ({ navigation }) => {

    const [markerList] = useState(hospitalsList);
    const [region] = useState(
        {
            latitude: 22.6292757,
            longitude: 88.444781,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        }
    );

    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    const _map = createRef();

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / cardWidth + 0.3);
            if (index >= markerList.length) {
                index = markerList.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = markerList[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolation = markerList.map((marker, index) => {
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            ((index + 1) * cardWidth),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * cardWidth) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _scrollView = useRef(null);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {markersInfo()}
                <View style={styles.hospitalsWrapStyle}>
                    {hospitals()}
                </View>
            </View>
        </View>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Hospitals Near You
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }

    function markersInfo() {
        return (
            <MapView
                ref={_map}
                style={{ flex: 1, }}
                initialRegion={region}
            >
                {
                    markerList.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolation[index].scale
                                }
                            ]
                        }
                        return (
                            <Marker
                                key={index}
                                coordinate={marker.coordinate}
                                onPress={(e) => onMarkerPress(e)}
                            >
                                <Animated.View
                                    style={styles.markerStyle}
                                >
                                    <Animated.Image
                                        source={require('../../assets/images/icons/marker.png')}
                                        resizeMode="contain"
                                        style={[{ width: 30.0, height: 30.0 }, scaleStyle]}
                                    >
                                    </Animated.Image>
                                </Animated.View>
                            </Marker>
                        )
                    })
                }
            </MapView>
        )
    }

    function hospitals() {
        return (
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={cardWidth + 15}
                snapToAlignment="center"
                decelerationRate='fast'
                style={{ paddingVertical: Sizes.fixPadding, }}
                contentContainerStyle={{ paddingHorizontal: SPACING_FOR_CARD_INSET }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {
                    markerList.map((marker, index) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { }}
                            key={index} style={{ ...styles.hospitalInfoWrapStyle, }}
                        >
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                                {marker.hospitalName}
                            </Text>
                            <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                                {marker.hospitalCategory}
                            </Text>
                            <View style={styles.callNowButtonWrapStyle}>
                                <MaterialIcons
                                    name='call'
                                    color={Colors.primaryColor}
                                    size={15.0}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.primaryColor12Bold }}>
                                    Call Now
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons
                                    name='location-pin'
                                    color={Colors.lightGrayColor}
                                    size={15}
                                />
                                <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                                    {marker.address}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </Animated.ScrollView>
        )
    }
}

export default NearestHospitalScreen

const styles = StyleSheet.create({
    hospitalInfoWrapStyle: {
        elevation: 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginRight: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        width: cardWidth,
    },
    hospitalsWrapStyle: {
        position: 'absolute',
        bottom: 8.0,
        left: 0.0,
        right: 0.0,
    },
    markerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45.0,
        height: 45.0,
    },
    callNowButtonWrapStyle: {
        marginTop: -(Sizes.fixPadding - 5.0),
        marginBottom: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    }
})