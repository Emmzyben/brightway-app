import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import MyStatusBar from "../../components/myStatusBar";
import { Circle } from "react-native-animated-spinkit";

const { width } = Dimensions.get("window");

const VerificationScreen = ({ navigation }) => {
  const [otpInput, setotpInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {backArrow()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {verificationInfo()}
          {otpInfo()}
          {continueButton()}
        </ScrollView>
      </View>
      {loadingDialog()}
    </View>
  );

  function loadingDialog() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLoading}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={styles.dialogStyle}
            >
              <View style={{ alignItems: "center" }}>
                <Circle color={Colors.primaryColor} size={56} />
                <Text
                  style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    ...Fonts.grayColor15Regular,
                  }}
                >
                  Please Wait...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push("BottomTabBar");
          }, 2000);
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor17Bold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function otpInfo() {
    return (
      <OtpInput
        numberOfDigits={4}
        focusColor={Colors.primaryColor}
        onTextChange={text => {
          setotpInput(text)
          if (text.length == 4) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push("BottomTabBar");
            }, 2000);
          }
        }}
        theme={{
          containerStyle: {
            mmarginHorizontal: Sizes.fixPadding * 2.0,
            marginVertical: Sizes.fixPadding * 4.0,
          },
          inputsContainerStyle: {
            justifyContent: 'center',
          },
          pinCodeContainerStyle: { ...styles.textFieldStyle },
          pinCodeTextStyle: { ...Fonts.blackColor16Medium, },
          focusedPinCodeContainerStyle: { borderWidth: 1.5 }
        }}
      />
    );
  }

  function verificationInfo() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor22Bold }}>Verification</Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: Sizes.fixPadding,
            ...Fonts.blackColor14Medium,
          }}
        >
          Enter 4 digit verification code. We just sent you on 789-896-159
        </Text>
      </View>
    );
  }

  function backArrow() {
    return (
      <MaterialIcons
        name="arrow-back"
        color={Colors.blackColor}
        size={24}
        onPress={() => {
          navigation.pop();
        }}
        style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start', }}
      />
    );
  }
};

export default VerificationScreen;

const styles = StyleSheet.create({
  textFieldStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.bodyBackColor,
    borderWidth: 0.0,
    height: width / 7.5,
    width: width / 7.5,
    marginHorizontal: Sizes.fixPadding - 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding + 8.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 2.0,
    ...CommonStyles.buttonShadow,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  dialogStyle: {
    width: "85%",
    padding: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center'
  },
});
