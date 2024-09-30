import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const userMessages = [
  {
    id: "1",
    message:
      "Hii Doctor, I’m a Gastroenterology patient. I need your help imidiately.",
    isSender: true,
    messageDateAndTime: "Jan 23, 10:05 pm",
  },
  {
    id: "2",
    message: "Hi, don’t warry I am here.Let me know your situation now.",
    isSender: false,
    messageDateAndTime: "Jan 23, 10:05 pm",
  },
  {
    id: "3",
    messageType: "image",
    messageImage: require("../../assets/images/messageImage.png"),
    isSender: true,
    messageDateAndTime: "Jan 23, 10:05 pm",
  },
];

const ChatWithDoctorScreen = ({ navigation }) => {
  const [messagesList, setMessagesList] = useState(userMessages);
  const doctorImage = require("../../assets/images/doctors/doctor1.png");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'height' : null}
      style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}
    >
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {messages()}
      </View>
      {typingIndicator()}
      {typeMessage()}
    </KeyboardAvoidingView>
  );

  function messages() {
    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            alignItems: item.isSender == true ? "flex-end" : "flex-start",
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom:
              index != messagesList.length - 1
                ? messagesList[index].isSender ==
                  messagesList[index + 1].isSender
                  ? Sizes.fixPadding - 2.0
                  : Sizes.fixPadding * 2.5
                : messagesList[index].isSender ==
                  messagesList[index - 1].isSender
                  ? Sizes.fixPadding * 2.5
                  : Sizes.fixPadding - 2.0,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            {!item.isSender ? (
              index != 0 ? (
                messagesList[index].isSender ==
                  messagesList[index - 1].isSender ? (
                  <View style={{ marginRight: Sizes.fixPadding * 4.5 }} />
                ) : (
                  <View style={{ marginRight: Sizes.fixPadding }}>
                    <Image
                      source={doctorImage}
                      style={{ ...styles.receiverImageStyle }}
                    />
                  </View>
                )
              ) : messagesList[index].isSender ==
                messagesList[index + 1].isSender ||
                !messagesList[index].isSender ? (
                <View style={{ marginRight: Sizes.fixPadding }}>
                  <Image
                    source={doctorImage}
                    style={{ ...styles.receiverImageStyle }}
                  />
                </View>
              ) : null
            ) : null}
            <View>
              <View
                style={{
                  ...styles.messageWrapStyle,
                  backgroundColor:
                    item.isSender == true
                      ? Colors.whiteColor
                      : Colors.primaryColor,
                }}
              >
                {item.messageType == "image" ? (
                  <Image
                    source={item.messageImage}
                    style={{
                      margin: -5.0,
                      width: width / 2.0,
                      height: width / 3.0,
                      borderRadius: Sizes.fixPadding,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      ...(item.isSender
                        ? { ...Fonts.blackColor14Medium }
                        : { ...Fonts.whiteColor14Medium }),
                    }}
                  >
                    {item.message}
                  </Text>
                )}
              </View>
              {item.isSender ? null : (
                <Text
                  style={{
                    marginTop: Sizes.fixPadding - 5.0,
                    ...Fonts.grayColor12Medium,
                    alignSelf: "flex-end",
                  }}
                >
                  {item.messageDateAndTime}
                </Text>
              )}
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
        <FlatList
          inverted
          data={messagesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "column-reverse",
            paddingBottom: Sizes.fixPadding * 2.0,
          }}
          automaticallyAdjustKeyboardInsets={true}
        />
      </View>
    );
  }

  function typingIndicator() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={doctorImage} style={{ ...styles.receiverImageStyle }} />
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            ...Fonts.grayColor14Medium,
          }}
        >
          Dr. Ismail Sendi is typing...
        </Text>
      </View>
    );
  }

  function addMessage({ message }) {
    const oldMessages = messagesList;

    let date = Date();
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let AmPm = hour >= 12 ? "pm" : "am";
    let finalhour = hour > 12 ? hour - 12 : hour;
    let displayHour =
      finalhour.toString().length == 1 ? `0${finalhour}` : finalhour;
    let displayMinute = minute.toString().length == 1 ? `0${minute}` : minute;

    const newMessage = {
      id: messagesList.length + 1,
      message: message,
      messageTime: `${displayHour}:${displayMinute} ${AmPm}`,
      isSender: true,
    };

    oldMessages.push(newMessage);
    setMessagesList(oldMessages);
  }

  function typeMessage() {
    const [message, setMessage] = useState("");
    return (
      <View style={styles.typeMessageWrapStyle}>
        <TextInput
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message..."
          style={{
            flex: 1,
            ...Fonts.blackColor14Medium,
            marginHorizontal: Sizes.fixPadding,
          }}
          placeholderTextColor={Colors.grayColor}
        />
        <MaterialIcons
          name="send"
          size={20}
          color={Colors.primaryColor}
          style={{ marginLeft: Sizes.fixPadding - 5.0 }}
          onPress={() => {
            if (message != "") {
              addMessage({ message: message });
              setMessage("");
            }
          }}
        />
      </View>
    );
  }

  function header() {
    const isOnline = true;
    return (
      <View style={styles.headerStyle}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors.blackColor}
            onPress={() => {
              navigation.pop();
            }}
          />
          <Image
            source={require("../../assets/images/doctors/doctor1.png")}
            style={styles.headerImageStyle}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
              Dr. Ismail Sendi
            </Text>
            <Text>
              <Text
                style={{
                  ...Fonts.blackColor18Bold,
                  color: isOnline ? Colors.darkGreenColor : Colors.redColor,
                }}
              >
                • { }
              </Text>
              <Text style={{ ...Fonts.blackColor14Medium }}>
                {isOnline ? "Online" : "Offline"}
              </Text>
            </Text>
          </View>
        </View>
        <MaterialIcons name="more-vert" color={Colors.blackColor} size={22} />
      </View>
    );
  }
};

export default ChatWithDoctorScreen;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  headerImageStyle: {
    marginLeft: Sizes.fixPadding + 5.0,
    width: 45.0,
    height: 45.0,
    borderRadius: 22.5,
    backgroundColor: Colors.primaryColor,
    resizeMode: "contain",
  },
  typeMessageWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  messageWrapStyle: {
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    maxWidth: width - 90.0,
  },
  receiverImageStyle: {
    width: 35.0,
    height: 35.0,
    borderRadius: 17.5,
    resizeMode: "contain",
    backgroundColor: Colors.primaryColor,
  },
});
