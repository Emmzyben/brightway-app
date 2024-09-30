import { StyleSheet, Text, View, Dimensions, Image, FlatList, } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');

const dummyReview = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec amet purus cursus orci varius amet slit. senectus gravida.'

const reviews = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user1.png'),
        userName: 'Leslie Alexander',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '17 Dec, 2020',
        review: dummyReview
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Tynisha Obey',
        rating: 4.0,
        visitReason: 'Cold Fever',
        reviewDate: '15 Dec, 2020',
        review: dummyReview
    },
    {
        id: '3',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Florencio Dorrance',
        rating: 4.0,
        visitReason: 'Cold Fever',
        reviewDate: '12 Dec, 2020',
        review: dummyReview
    },
    {
        id: '4',
        userImage: require('../../assets/images/users/user4.png'),
        userName: 'Roselle Ehrman',
        rating: 3.0,
        visitReason: 'Cold Fever',
        reviewDate: '11 Dec, 2020',
        review: dummyReview
    },
    {
        id: '5',
        userImage: require('../../assets/images/users/user5.png'),
        userName: 'Leif Floyd',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '11 Dec, 2020',
        review: dummyReview
    },
    {
        id: '6',
        userImage: require('../../assets/images/users/user6.png'),
        userName: 'Geoffrey Mott',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '10 Dec, 2020',
        review: dummyReview
    },
    {
        id: '7',
        userImage: require('../../assets/images/users/user1.png'),
        userName: 'Leslie Alexander',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '17 Dec, 2020',
        review: dummyReview
    },
    {
        id: '8',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Tynisha Obey',
        rating: 4.0,
        visitReason: 'Cold Fever',
        reviewDate: '15 Dec, 2020',
        review: dummyReview
    },
    {
        id: '9',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Florencio Dorrance',
        rating: 4.0,
        visitReason: 'Cold Fever',
        reviewDate: '12 Dec, 2020',
        review: dummyReview
    },
    {
        id: '10',
        userImage: require('../../assets/images/users/user4.png'),
        userName: 'Roselle Ehrman',
        rating: 3.0,
        visitReason: 'Cold Fever',
        reviewDate: '11 Dec, 2020',
        review: dummyReview
    },
    {
        id: '11',
        userImage: require('../../assets/images/users/user5.png'),
        userName: 'Leif Floyd',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '11 Dec, 2020',
        review: dummyReview
    },
    {
        id: '12',
        userImage: require('../../assets/images/users/user6.png'),
        userName: 'Geoffrey Mott',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '10 Dec, 2020',
        review: dummyReview
    },
];

const ReviewsScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            <FlatList
                ListHeaderComponent={
                    <>
                        {doctorAndReviewInfo()}
                        {reviewGivers()}
                    </>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    )

    function reviewGivers() {
        const renderItem = ({ item }) => (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding - 5.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={item.userImage}
                        style={styles.userimageStyle}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                                {item.userName}
                            </Text>
                            <View style={{ marginLeft: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                                {showRating({ number: item.rating })}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 7.0 }}>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                                <Text style={{ ...Fonts.grayColor12Medium }}>
                                    Visited For { }
                                </Text>
                                {item.visitReason}
                            </Text>
                            <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor12Medium }}>
                                {item.reviewDate}
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                    {item.review}
                </Text>
            </View>
        )
        return (
            <FlatList
                data={reviews}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        )
    }

    function doctorAndReviewInfo() {
        return (
            <View style={styles.doctorAndReviewInfoWrapStyle}>
                {doctorInfo()}
                {reviewInfo()}
            </View>
        )
    }

    function reviewInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 3.0, ...Fonts.blackColor18SemiBold }}>
                    Average Reviews (4.5)
                </Text>
                {ratingShort({ ratingStar: 5, progress: 0.9, ratingCount: 78 })}
                {ratingShort({ ratingStar: 4, progress: 0.70, ratingCount: 46 })}
                {ratingShort({ ratingStar: 3, progress: 0.55, ratingCount: 36 })}
                {ratingShort({ ratingStar: 2, progress: 0.35, ratingCount: 11 })}
                {ratingShort({ ratingStar: 1, progress: 0.15, ratingCount: 2 })}
            </View>
        )
    }

    function ratingShort({ ratingStar, progress, ratingCount }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding }}>
                <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.blackColor14Bold }}>
                    {ratingStar}
                </Text>
                <MaterialIcons
                    name='star'
                    color={Colors.darkYellowColor}
                    size={16}
                />
                <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
                    <Progress.Bar
                        progress={progress}
                        width={null}
                        height={12}
                        borderRadius={Sizes.fixPadding * 1.7}
                        borderWidth={0}
                        unfilledColor={Colors.bodyBackColor}
                        color={Colors.primaryColor}
                    />
                </View>
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    {ratingCount.toString().length == 1 ? `0${ratingCount}` : ratingCount}
                </Text>
            </View>
        )
    }

    function doctorInfo() {
        return (
            <View style={styles.doctorInfoWrapStyle}>
                <View style={{ ...styles.doctorImageBackgroundStyle, }}>
                    <Image
                        source={require('../../assets/images/doctor/doctor1.png')}
                        style={styles.doctorImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
                        Dr.	Ismail Sendi
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 8.0, flexDirection: 'row', alignItems: 'center' }}>
                        {showRating({ number: 4.0 })}
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor13SemiBold }}>
                            (152)
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function showRating({ number }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0)
                        ?
                        <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                        :
                        <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0)
                        ?
                        <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                        :
                        <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0)
                        ?
                        <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                        :
                        <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
                }
                {
                    (number == 5.0 || number == 4.0)
                        ?
                        <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                        :
                        <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
                }
                {
                    (number == 5.0) ?
                        <MaterialIcons name="star" size={14} color={Colors.darkYellowColor} />
                        :
                        <MaterialIcons name="star" size={14} color={Colors.lightGrayColor} />
                }
            </View>
        )
    }

    function header() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor20Bold }}>
                    Reviews
                </Text>
            </View>
        )
    }
}

export default ReviewsScreen

const styles = StyleSheet.create({
    doctorImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: 110,
        width: width / 3.5,
        alignItems: 'center',
        backgroundColor: Colors.purpleColor,
    },
    doctorImageStyle: {
        width: (width / 3.5) - 15.0,
        height: '125%',
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
    },
    doctorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    doctorAndReviewInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding,
    },
    userimageStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.primaryColor,
        resizeMode: 'contain'
    }
})