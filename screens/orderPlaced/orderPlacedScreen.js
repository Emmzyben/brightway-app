import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useCallback } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const OrderPlacedScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS == "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      navigation.navigate("Medicine");
      return true;
    }
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
        {placedDetail()}
        {continueShoppingButton()}
      </View>
    </View>
  );

  function continueShoppingButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Medicine");
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>Continue Shopping</Text>
      </TouchableOpacity>
    );
  }

  function placedDetail() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            marginHorizontal: Sizes.fixPadding * 5.0,
          }}
        >
          <Image
            source={require("../../assets/images/orderPlaced.png")}
            style={{
              width: "100%",
              height: width / 1.7,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
          >
            Your Order Placed !!
          </Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor14Medium,
              textAlign: "center",
            }}
          >
            Your order has been placed successfully.Visit My order to check your
            order status
          </Text>
        </ScrollView>
      </View>
    );
  }

  function header() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          numberOfLines={1}
          style={{ textAlign: "center", ...Fonts.blackColor20Bold }}
        >
          Order Placed
        </Text>
      </View>
    );
  }
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
});
