import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const ReviewScreen = ({ navigation }) => {
  const [feedback, setfeedback] = useState("");
  const [rate1, setRate1] = useState(true);
  const [rate2, setRate2] = useState(true);
  const [rate3, setRate3] = useState(true);
  const [rate4, setRate4] = useState(true);
  const [rate5, setRate5] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
          automaticallyAdjustKeyboardInsets={true}
        >
          {sellerInfo()}
          {experienceInfo()}
        </ScrollView>
      </View>
      {submitButton()}
    </View>
  );

  function submitButton() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.pop();
          }}
          style={styles.buttonStyle}
        >
          <Text style={{ ...Fonts.whiteColor17Bold }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function rating() {
    return (
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name="star"
          size={30}
          color={rate1 ? Colors.darkYellowColor : Colors.bodyBackColor}
          onPress={() => {
            if (rate1) {
              setRate2(false);
              setRate3(false);
              setRate4(false);
              setRate5(false);
            } else {
              setRate1(true);
            }
          }}
        />
        <MaterialIcons
          name="star"
          size={30}
          color={rate2 ? Colors.darkYellowColor : Colors.bodyBackColor}
          onPress={() => {
            if (rate2) {
              setRate1(true);
              setRate3(false);
              setRate4(false);
              setRate5(false);
            } else {
              setRate2(true);
              setRate1(true);
            }
          }}
        />
        <MaterialIcons
          name="star"
          size={30}
          color={rate3 ? Colors.darkYellowColor : Colors.bodyBackColor}
          onPress={() => {
            if (rate3) {
              setRate4(false);
              setRate5(false);
              setRate2(true);
            } else {
              setRate3(true);
              setRate2(true);
              setRate1(true);
            }
          }}
        />
        <MaterialIcons
          name="star"
          size={30}
          color={rate4 ? Colors.darkYellowColor : Colors.bodyBackColor}
          onPress={() => {
            if (rate4) {
              setRate5(false);
              setRate3(true);
            } else {
              setRate4(true);
              setRate3(true);
              setRate2(true);
              setRate1(true);
            }
          }}
        />
        <MaterialIcons
          name="star"
          size={30}
          color={rate5 ? Colors.darkYellowColor : Colors.bodyBackColor}
          onPress={() => {
            if (rate5) {
              setRate4(true);
            } else {
              setRate5(true);
              setRate4(true);
              setRate3(true);
              setRate2(true);
              setRate1(true);
            }
          }}
        />
      </View>
    );
  }

  function experienceInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor17Bold }}
        >
          Overall Experience
        </Text>
        {rating()}
        <Text
          style={{
            marginTop: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor16SemiBold,
          }}
        >
          Add Feedback
        </Text>
        <TextInput
          placeholder="Write here..."
          placeholderTextColor={Colors.grayColor}
          numberOfLines={5}
          multiline
          value={feedback}
          onChangeText={(value) => {
            setfeedback(value);
          }}
          style={{
            ...styles.textFieldStyle,
            paddingTop:
              Platform.OS == "ios" ? Sizes.fixPadding + 5.0 : Sizes.fixPadding,
            height: Platform.OS == "ios" ? 120 : null,
          }}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          textAlignVertical="top"
        />
      </View>
    );
  }

  function sellerInfo() {
    return (
      <View style={styles.sallerInfoWrapStyle}>
        <Image
          source={require("../../assets/images/seller/seller1.png")}
          style={{
            width: width / 3.7,
            height: width / 3.7,
            borderRadius: Sizes.fixPadding - 5.0,
          }}
        />
        <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1 }}>
          <Text numberOfLines={1} style={{ ...Fonts.blackColor17SemiBold }}>
            All Health Pharmacy
          </Text>
          <View
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="location-pin"
              color={Colors.lightGrayColor}
              size={16}
            />
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding - 7.0,
                ...Fonts.grayColor15Medium,
              }}
            >
              83 Woodhedge Drive
            </Text>
          </View>
        </View>
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
          Review Order
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

export default ReviewScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  sallerInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  textFieldStyle: {
    marginTop: Sizes.fixPadding,
    backgroundColor: Colors.bodyBackColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 8.0,
    marginBottom: Sizes.fixPadding * 2.0,
    elevation: 1.0,
    ...CommonStyles.buttonShadow
  },
});
