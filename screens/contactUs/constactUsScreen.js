import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const ContactusScreen = ({ navigation }) => {
  const [fullName, setfullName] = useState("Samantha Smith");
  const [email, setemail] = useState("samanthasmith@gmail.com");
  const [message, setmessage] = useState("");

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
          {contactInfo()}
          {messageInfo()}
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

  function messageInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Or Send your message
        </Text>
        {fullNameInfo()}
        {emailAddressInfo()}
        {messageField()}
      </View>
    );
  }

  function messageField() {
    return (
      <View>
        <Text style={{ ...Fonts.grayColor14Medium }}>Your Message</Text>
        <TextInput
          value={message}
          onChangeText={(value) => {
            setmessage(value);
          }}
          style={{ ...styles.messageFieldStyle }}
          placeholder="Write here..."
          placeholderTextColor={Colors.grayColor}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          numberOfLines={5}
          multiline
          textAlignVertical="top"
        />
      </View>
    );
  }

  function emailAddressInfo() {
    return (
      <View style={{ marginBottom: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor14Medium }}>Email Address</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons name="email" color={Colors.lightGrayColor} size={20} />
          <TextInput
            value={email}
            onChangeText={(value) => {
              setemail(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View style={{ marginBottom: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor14Medium }}>Full Name</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons
            name="person"
            color={Colors.lightGrayColor}
            size={20}
          />
          <TextInput
            value={fullName}
            onChangeText={(value) => {
              setfullName(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function contactInfo() {
    return (
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          padding: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding,
        }}
      >
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          Let us know your issue & feedback
        </Text>
        <View
          style={{
            marginVertical: Sizes.fixPadding * 2.5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="call" color={Colors.primaryColor} size={18} />
          <Text
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding + 5.0,
              ...Fonts.grayColor16Medium,
            }}
          >
            +1 589-896-896
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="email" color={Colors.primaryColor} size={18} />
          <Text
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding + 5.0,
              ...Fonts.grayColor16Medium,
            }}
          >
            doctorops123@gmail.com
          </Text>
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
          Contact us
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

export default ContactusScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  textFieldWrapStyle: {
    backgroundColor: Colors.bodyBackColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 7.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
  },
  textFieldStyle: {
    flex: 1,
    ...Fonts.blackColor16Medium,
    height: 20.0,
    marginLeft: Sizes.fixPadding,
  },
  messageFieldStyle: {
    padding: Sizes.fixPadding,
    ...Fonts.blackColor16Medium,
    backgroundColor: Colors.bodyBackColor,
    marginTop: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    paddingTop:
      Platform.OS == "ios" ? Sizes.fixPadding + 5.0 : Sizes.fixPadding,
    height: Platform.OS == "ios" ? 120 : null,
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
