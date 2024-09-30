import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform, FlatList
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const pendingchats= [
  {
      id: '1',
      chat: 'Adam Price',
      time: '2/2/2024  2:00pm ',
  },
  {
      id: '2',
      chat: 'Rita Hook',
      time: '2/2/2024  2:00pm ',
  },

];
const DriverConversation = ({ navigation }) => {
 

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {chats()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
          automaticallyAdjustKeyboardInsets={true}
        >
          
        </ScrollView>
      </View>
    </View>
  );

  function chats() {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { navigation.push('ChatWithDoctor') }}
            style={styles.hospitalInfoWrapStyle}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View
            style={{
              backgroundColor: "#F3E5F5",
              ...styles.chatIconWrapStyle,
            }}
          >
          <Ionicons 
          name="chatbubble" // Correct icon name
           size={20} 
           color='rgba(58, 155, 195, 0.80)' 
             />

          </View>
                <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        {item.chat}
                    </Text>
                    <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 8.0, marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                        {item.time}
                    </Text>
                </View>
              
            </View>
           
           
        </TouchableOpacity>
    )
    return (
        <View>
            <View style={{ margin: Sizes.fixPadding * 1.0, flexDirection: 'row', alignItems: 'center', }}>
                
                <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { navigation.push('chats') }}
        >
  
        </TouchableOpacity>
          </View>
            <FlatList
                data={pendingchats}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                scrollEnabled={false}
                automaticallyAdjustKeyboardInsets={true}
            />
        </View>
    )
}


  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text
          numberOfLines={1}
          style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}
        >
          Conversations
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

export default DriverConversation;

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
  },chatIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: Sizes.fixPadding - 3.0,
    alignItems: "center",
    justifyContent: "center",marginRight:10
  },
  hospitalInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    paddingLeft: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginBottom: Sizes.fixPadding,
},
});
