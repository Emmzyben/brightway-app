import { StyleSheet, Text, View, Dimensions, Image, FlatList, } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { showRating } from '../../components/showRatings';
import MyStatusBar from '../../components/myStatusBar';

const { width } = Dimensions.get('window');

const dummyReview = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec amet purus cursus orci varius amet slit. senectus gravida.'

const reviews = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Leslie Alexander',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '17 Dec, 2020',
        review: dummyReview
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Tynisha Obey',
        rating: 4.0,
        visitReason: 'Cold Fever',
        reviewDate: '15 Dec, 2020',
        review: dummyReview
    },
    {
        id: '3',
        userImage: require('../../assets/images/users/user4.png'),
        userName: 'Florencio Dorrance',
        rating: 4.0,
        visitReason: 'Cold Fever',
        reviewDate: '12 Dec, 2020',
        review: dummyReview
    },
    {
        id: '4',
        userImage: require('../../assets/images/users/user5.png'),
        userName: 'Roselle Ehrman',
        rating: 3.0,
        visitReason: 'Cold Fever',
        reviewDate: '11 Dec, 2020',
        review: dummyReview
    },
    {
        id: '5',
        userImage: require('../../assets/images/users/user6.png'),
        userName: 'Leif Floyd',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '11 Dec, 2020',
        review: dummyReview
    },
    {
        id: '6',
        userImage: require('../../assets/images/users/user7.png'),
        userName: 'Geoffrey Mott',
        rating: 5.0,
        visitReason: 'Cold Fever',
        reviewDate: '10 Dec, 2020',
        review: dummyReview
    },
];

const DoctorReviewsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {averageReviewInfo()}
                {reviewsInfo()}
            </View>
        </View>
    )

    function reviewsInfo() {
        const renderItem = ({ item }) => (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={item.userImage}
                        style={styles.imageStyle}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
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
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function averageReviewInfo() {
        return (
            <View style={styles.averageReviewInfoWrapStyle}>
                <Image
                    source={require('../../assets/images/doctors/doctor1.png')}
                    style={styles.imageStyle}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
                            Dr. Ismail Sendi
                        </Text>
                        <View style={{ marginLeft: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name='star'
                                color={Colors.darkYellowColor}
                                size={16.0}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.darkYellowColor14Bold }}>
                                4.5
                            </Text>
                        </View>
                    </View>
                    <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        Average Reviews
                    </Text>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                    Reviews
                </Text>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor} style={{ position: 'absolute', left: 20.0 }} onPress={() => { navigation.pop() }} />
            </View>
        )
    }
}

export default DoctorReviewsScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    averageReviewInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    imageStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.primaryColor,
        resizeMode: 'contain'
    }
})