import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-snap-carousel-v4';
import { Colors, Fonts, Sizes } from '../constants/styles';

const { width } = Dimensions.get('window');

const itemWidth = Math.round(width * 0.8);

const Banner = ({ banners, bannerRef }) => {

    const [activeBannerIndex, setactiveBannerIndex] = useState(1);

    const renderItem = ({ item }) => (
        <ImageBackground
            source={require('../assets/images/banner_bg.png')}
            style={styles.bannerImageStyle}
            resizeMode="stretch"
            borderRadius={Sizes.fixPadding}
        >
            <Text numberOfLines={2} style={{ width: '75%', ...Fonts.whiteColor16Bold, }}>
                {item.desc}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                <View style={{ backgroundColor: 0 == activeBannerIndex ? Colors.whiteColor : '#ffffff80', ...styles.bannerIndicatorStyle }} />
                <View style={{ backgroundColor: 1 == activeBannerIndex ? Colors.whiteColor : '#ffffff80', ...styles.bannerIndicatorStyle, marginHorizontal: Sizes.fixPadding }} />
                <View style={{ backgroundColor: 2 == activeBannerIndex ? Colors.whiteColor : '#ffffff80', ...styles.bannerIndicatorStyle }} />
            </View>
        </ImageBackground>
    )
    return (
        <View style={{ marginTop: -((width / 2.6) / 1.85), }}>
            <View style={{ bottom: -20, width: itemWidth - 40, ...styles.bannerBottomStyle, backgroundColor: '#FFFFFF60', }} />
            <View style={{ ...styles.bannerBottomStyle, bottom: -10, width: itemWidth - 20, backgroundColor: Colors.whiteColor }} />
            <Carousel
                ref={bannerRef}
                data={banners}
                sliderWidth={width}
                itemWidth={itemWidth}
                renderItem={renderItem}
                onSnapToItem={(index) => setactiveBannerIndex(index)}
                loop={true}
                autoplayInterval={4000}
                firstItem={1}
                inactiveSlideOpacity={1}
            />
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    bannerBottomStyle: {
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding,
        height: 20.0,
        position: 'absolute',
    },
    bannerIndicatorStyle: {
        width: 20.0,
        height: 3.0,
        borderRadius: Sizes.fixPadding,
    },
    bannerImageStyle: {
        width: itemWidth,
        height: width / 2.6,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        padding: Sizes.fixPadding * 2.0,
    },
})