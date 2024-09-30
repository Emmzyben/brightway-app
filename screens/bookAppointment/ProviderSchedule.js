import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { showRating } from "../../components/showRatings";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const appointmentTimes = [
  "09:00 am",
  "09:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 am",
  "02:00 pm",
  "02:30 pm",
  "03:00 pm",
  "03:30 pm",
  "04:00 pm",
];

const ProviderSchedule = ({ navigation }) => {
  const [selectedDate, setselectedDate] = useState(null);
  const [selectedTimeIndex, setselectedTimeIndex] = useState(1);
  const [reason, setreason] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
          {selectDate()}
          {selectTime1()}
          {selectTime2()}
        </ScrollView>
      </View>
      {confirmButton()}
    </View>
  );

  function confirmButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
       
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>Create Schedule</Text>
      </TouchableOpacity>
    );
  }



  function selectTime1() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setselectedTimeIndex(index);
        }}
        style={{
          backgroundColor:
            selectedTimeIndex == index
              ? Colors.primaryColor
              : Colors.bodyBackColor,
          ...styles.timeWrapStyle,
        }}
      >
        <Text
          style={
            selectedTimeIndex == index
              ? { ...Fonts.whiteColor14Medium }
              : { ...Fonts.blackColor14Medium }
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          marginVertical: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            ...Fonts.blackColor18SemiBold,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          Available From
        </Text>
        <FlatList
          data={appointmentTimes}
          keyExtractor={(index) => `${index}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingTop: Sizes.fixPadding + 5.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }
  function selectTime2() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setselectedTimeIndex(index);
        }}
        style={{
          backgroundColor:
            selectedTimeIndex == index
              ? Colors.primaryColor
              : Colors.bodyBackColor,
          ...styles.timeWrapStyle,
        }}
      >
        <Text
          style={
            selectedTimeIndex == index
              ? { ...Fonts.whiteColor14Medium }
              : { ...Fonts.blackColor14Medium }
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          marginVertical: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            ...Fonts.blackColor18SemiBold,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
         To
        </Text>
        <FlatList
          data={appointmentTimes}
          keyExtractor={(index) => `${index}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingTop: Sizes.fixPadding + 5.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }
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
          Select Date
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



  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text
          numberOfLines={1}
          style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}
        >
          Create Schedule
        </Text>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.blackColor}
          style={{ position: "absolute", left: 20.0 }}
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    );
  }
};

export default ProviderSchedule;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  doctorImageBackgroundStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    height: 110,
    width: width / 3.5,
    alignItems: "center",
    backgroundColor: Colors.purpleColor,
  },
  doctorImageStyle: {
    width: width / 3.5 - 15.0,
    height: "125%",
    resizeMode: "stretch",
    position: "absolute",
    bottom: 0.0,
  },
  doctorInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 4.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  timeWrapStyle: {
    padding: Sizes.fixPadding + 2.0,
    marginRight: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  apponitmentForField: {
    backgroundColor: Colors.bodyBackColor,
    padding: Sizes.fixPadding + 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    height: Platform.OS == "ios" ? 120 : null,
    paddingTop:
      Platform.OS == "ios" ? Sizes.fixPadding + 5.0 : Sizes.fixPadding,
  },
});
