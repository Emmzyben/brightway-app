import { StyleSheet, Text, View, Image, Dimensions, FlatList, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreMessage from "../../hooks/useStoreMessage";
import useFetchMessages from "../../hooks/useFetchMessages";

const { width } = Dimensions.get("window");

const ChatWithDoctorScreen = ({ route, navigation }) => {
  const [message, setMessage] = useState(""); // State for new message input
  const [messagesList, setMessagesList] = useState([]); // State for the list of messages
  const [loading, setLoading] = useState(true); // Loading state for messages

  const { conversationId, participant1Id, conversationData } = route.params;
  const {
    participant2Id,
    participant2FirstName,
    participant2LastName,
    participant2_picture,
  } = conversationData;

  // Fetch logged-in userId
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      console.log("Logged in user ID:", userId); // Debug log
      setLoggedInUserId(userId);
    };
    getUserId();
  }, []);

  // Fetch messages using useFetchMessages hook
  const { messages, error } = useFetchMessages(conversationId, participant1Id);
  
  useEffect(() => {
    if (messages) {
      console.log("Fetched messages:", messages); // Debug log
      setMessagesList(messages); // Set the fetched messages
      setLoading(false); // Stop loading once messages are fetched
    }
  }, [messages]);

  // Store new message using useStoreMessage hook
  const { storeMessage } = useStoreMessage();

  // Function to send a new message
  const sendMessage = async () => {
    if (message.trim() === "") return;
  
    const timestamp = new Date().toISOString();
    
    const newMessage = {
      conversationId,
      message,
      senderId: loggedInUserId, // Set senderId to loggedInUserId here
      receiverId: participant2Id, // Optionally include receiverId if needed
      timestamp,
    };
  
    const { success } = await storeMessage(conversationId, message, loggedInUserId, timestamp);
  
    if (success) {
      setMessagesList((prevMessages) => [newMessage, ...prevMessages]);
      setMessage("");
    } else {
      console.log("Failed to store message");
    }
  };
  
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}
    >
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        ) : error ? (
          <Text style={{ color: Colors.errorColor, textAlign: 'center' }}>Error fetching messages</Text>
        ) : (
          Messages()
        )}
      </View>
      {typeMessage()}
    </KeyboardAvoidingView>
  );

  function Messages() {
    const renderItem = ({ item, index }) => (
      <View
        style={{
          alignItems: item.senderId === loggedInUserId ? "flex-end" : "flex-start",
          marginHorizontal: Sizes.fixPadding * 3.0,
          marginBottom:
            index !== messagesList.length - 1 &&
            messagesList[index].senderId === messagesList[index + 1].senderId
              ? Sizes.fixPadding - 2.0
              : Sizes.fixPadding * 2.5,
        }}
      >
        <View style={{ flexDirection: item.senderId === loggedInUserId ? "row-reverse" : "row", alignItems: "flex-start" }}>
          {item.senderId !== loggedInUserId ? (
            <View style={{ marginRight: Sizes.fixPadding }}>
              <Image
                source={{ uri: participant2_picture }}
                style={styles.receiverImageStyle}
              />
            </View>
          ) : null}
          <View
            style={{
              ...styles.messageWrapStyle,
              backgroundColor: item.senderId === loggedInUserId ? Colors.primaryColor : Colors.whiteColor,
            }}
          >
            <Text
              style={
                item.senderId === loggedInUserId
                  ? { ...Fonts.whiteColor14Medium }
                  : { ...Fonts.blackColor14Medium }
              }
            >
              {item.message}
            </Text>
          </View>
        </View>
      </View>
    );
    

    return (
      <FlatList
        inverted
        data={messagesList}
        keyExtractor={(item) => `${item.timestamp}-${item.senderId}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "column-reverse",
          paddingBottom: Sizes.fixPadding * 9.0, 
          paddingTop: Sizes.fixPadding * 6.0,
        }}
      />
    );
  }

  function typeMessage() {
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
          onPress={sendMessage}
        />
      </View>
    );
  }

  // Header UI
  function header() {
    return (
      <View style={styles.headerStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors.blackColor}
            onPress={() => navigation.pop()}
          />
          <Image
            source={{ uri: participant2_picture }}
            style={styles.headerImageStyle}
          />
          <View style={{ marginHorizontal: Sizes.fixPadding }}>
            <Text numberOfLines={1} style={Fonts.blackColor18Bold}>
              {`${participant2FirstName} ${participant2LastName}`}
            </Text>
            <Text>
              <Text
                style={{
                  ...Fonts.blackColor14Medium,
                  color: Colors.darkGreenColor,
                }}
              >
                • Online
              </Text>
            </Text>
          </View>
        </View>
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
  },
  typeMessageWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding,
    position: "absolute",
    bottom: Sizes.fixPadding * 1.0,
    left: 0,
    right: 0,
  },
  receiverImageStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    backgroundColor: Colors.primaryColor,
  },
  messageWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    borderRadius: Sizes.fixPadding * 2.5,
  },
});
