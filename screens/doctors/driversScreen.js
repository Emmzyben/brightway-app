import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-material-menu';
import { showRating } from '../../components/showRatings';
import MyStatusBar from '../../components/myStatusBar';

const { width, height } = Dimensions.get('window');



const driversList = [
    {
        id: '1',
        driverImage: require('../../assets/images/users/user1.png'),
        driverName: ' Ismail Sendi',
        rating: 4.0,
        ratingCount: 152,
        
          
        bgColor: Colors.purpleColor,
    },
    {
        id: '2',
        driverImage: require('../../assets/images/users/user2.png'),
        driverName: ' Barry George',
        rating: 4.0,
        ratingCount: 152,
       
          
        bgColor: Colors.blueColor,
    },
    {
        id: '3',
        driverImage: require('../../assets/images/users/user3.png'),
        driverName: ' Carol Pollack',
        rating: 4.0,
        ratingCount: 152,
        
          
        bgColor: Colors.cyanColor,
    },
    {
        id: '4',
        driverImage: require('../../assets/images/users/user4.png'),
        driverName: 'Howard Axe',
        rating: 4.0,
        ratingCount: 152,
       
          
        bgColor: Colors.parrotColor,
    },
    {
        id: '5',
       driverImage: require('../../assets/images/users/user5.png'),
        driverName: 'Sally Amsel',
        rating: 4.0,
        ratingCount: 152,
        
          
        bgColor: Colors.greenColor,
    },
    {
        id: '6',
      driverImage: require('../../assets/images/users/user6.png'),
        driverName: 'Jean Bocage',
        rating: 4.0,
        ratingCount: 152,
       
          
        bgColor: Colors.yellowColor,
    },
    {
        id: '7',
        driverImage: require('../../assets/images/users/user7.png'),
        driverName: 'Don Doman',
        rating: 4.0,
        ratingCount: 152,
        
          
        bgColor: Colors.pitchColor,
    },
];

const DriversScreen = ({ navigation }) => {

  
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1, }}>
                {header()}
                {nearestdriversInfo()}
            </View>
        </View>
    )

    function nearestdriversInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('BookDriver') }}
                style={styles.docorInfoWrapStyle}
            >
                <View style={{ backgroundColor: item.bgColor, ...styles.driverImageBackgroundStyle, }}>
                    <Image
                        source={item.driverImage}
                        style={styles.driverImageStyle}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                            {item.driverName}
                        </Text>
                        <View style={{ marginLeft: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}>
                            {showRating({ number: item.rating })}
                            <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.grayColor11SemiBold }}>
                                ({item.ratingCount})
                            </Text>
                        </View>
                    </View>
                    <Text style={{ marginBottom: Sizes.fixPadding - 2.0, marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.serviceName}
                    </Text>
                  
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={driversList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
               
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
            
                <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
                   Drivers
                </Text>
                <TouchableOpacity   onPress={() => { navigation.push('StaffAppointmentScreen')}} >
                <Text style={{fontSize:17}}>All Bookings</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

export default DriversScreen

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
    driverImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 4.5,
        width: width / 4.7,
        alignItems: 'center',
    },
    driverImageStyle: {
        width: (width / 4.7) - 15.0,
        height: '100%',
        resizeMode: 'fill',
        position: 'absolute',
        bottom: 0.0,
    },
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        display:'flex',flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding * 2.0,
    },
})