import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import React, { useCallback } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const DeliverySuccessScreen = ({ navigation }) => {

  const backAction = () => {
    navigation.navigate("BottomTabBar");
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      navigation.addListener("gestureEnd", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
        navigation.removeListener("gestureEnd", backAction);
      };
    }, [backAction])
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {successInfo()}
        {backToHomeButton()}
      </View>
    </View>
  );

  function backToHomeButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("BottomTabBar");
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>View Bookings</Text>
      </TouchableOpacity>
    );
  }

  function successInfo() {
    return (
      <View style={styles.successInfoWrapStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: 'center' }}
        >
          <Image
            source={require("../../assets/images/bookingSuccessBg.png")}
            style={{
              width: "100%",
              height: width / 1.9,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              marginTop: Sizes.fixPadding * 2.0,
              ...Fonts.primaryColor14SemiBold,
            }}
          >
            Appointment Booked Successfully !!
          </Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor14Medium,
          }}
          >
           You have booked this provider successfully
          </Text>
        
        </ScrollView>
      </View>
    );
  }

  function header() {
    return (
      <Text numberOfLines={1} style={styles.headerTextStyle}>
       Booking Successfull!
      </Text>
    );
  }
};

export default DeliverySuccessScreen;

const styles = StyleSheet.create({
  successInfoWrapStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  headerTextStyle: {
    margin: Sizes.fixPadding * 2.0,
    textAlign: "center",
    ...Fonts.blackColor20Bold,
  },
});
