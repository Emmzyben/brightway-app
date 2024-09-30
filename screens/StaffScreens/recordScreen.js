import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import {CommonStyles } from '../../constants/styles'
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
const { width } = Dimensions.get('screen');

const userList = [
    {
        id: '1',
        RecordType: 'Clock In',
        time: '2/2/2024  2:00pm ',
    },
    {
        id: '2',
        RecordType: 'Clock Out',
        time: '2/2/2024  2:00pm ',
    },
];



const RecordScreen = ({ navigation }) => {
    const [selectedDate, setselectedDate] = useState(null);
       
      
    
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {header()}
            {selectDate()}
            {history()}
        </View>
    )
    function selectDate() {
        return (
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              paddingVertical: Sizes.fixPadding * 2.0,
            }}
          >
            <Text
              style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                ...Fonts.blackColor18SemiBold,
              }}
            >
              Search by Date
            </Text>
            <CalendarStrip
              style={{ height: 90 }}
              highlightDateContainerStyle={{
                backgroundColor: Colors.primaryColor,
                borderRadius: Sizes.fixPadding - 5.0,
              }}
              calendarHeaderContainerStyle={{ marginVertical: Sizes.fixPadding }}
              calendarHeaderStyle={{ ...Fonts.primaryColor14Bold }}
              iconStyle={{ width: 0.0, height: 0.0 }}
              dateNumberStyle={{ ...Fonts.blackColor14Medium }}
              dateNameStyle={{ ...Fonts.grayColor12Medium }}
              highlightDateNameStyle={{ ...Fonts.whiteColor12Medium, }}
              highlightDateNumberStyle={{ ...Fonts.whiteColor14Medium, }}
              useIsoWeekday={false}
              scrollable={true}
              upperCaseDays={false}
              styleWeekend={true}
              selectedDate={moment()}
              onDateSelected={(date) => {
                setselectedDate(date.format("DD MMM YYYY"));
              }}
            />
          </View>
        );
      }
    function history() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.hospitalInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                style={{
                  backgroundColor: "#F3E5F5",
                  ...styles.notificationIconWrapStyle,
                }}
              >
                <Ionicons
                  name="notifications"
                  size={20}
                  color='rgba(58, 155, 195, 0.80)'
                />
                </View>
                    <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0 }}>
                        <Text numberOfLines={1} style={Fonts.blackColor16Medium}>
                            {item.RecordType}
                        </Text>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
        return (
            <View>
                <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                
                </View>
                <FlatList
                    data={userList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}
                />
            </View>
        );
    }




 
    function header() {
        return (
            <View style={styles.headerStyle}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                  Attendance History
                   </Text>
            </View>
        )
    }
}

export default RecordScreen

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    docorInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 8.0,
        paddingTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
   patientImageBackgroundStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        height: width / 4.5,
        width: width / 4.7,
        alignItems: 'center',
    },
   patientImageStyle: {
        width: (width / 4.7) - 15.0,
        height: '115%',
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding + 8.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        elevation: 2.0,
        ...CommonStyles.buttonShadow,
        marginBottom: Sizes.fixPadding * 2.0,
    },
   
  
    hospitalInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding,
    },
    notificationIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 3.0,
        alignItems: "center",
        justifyContent: "center",marginRight:10
      },
})