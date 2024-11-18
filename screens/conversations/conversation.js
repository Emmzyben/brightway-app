import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import useFetchConversations from "../../hooks/useFetchConversations";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCreateConversation from '../../hooks/useCreateConversation';
import Loader from '../../components/activityLoader';

const { width } = Dimensions.get("window");
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp); 
  return date.toLocaleString('en-US', { 
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, 
  });
};

const Conversation = ({ navigation }) => {
  const { messages, loading, error, fetchMessages } = useFetchConversations();
  const [userId, setUserId] = useState(null);
  const { createConversation, loading: loadingConversation, error: conversationError } = useCreateConversation();

  useFocusEffect(
    useCallback(() => {
      const fetchUserId = async () => {
        const id = await AsyncStorage.getItem("userId");
        setUserId(id);
      };

      fetchUserId();
      fetchMessages();
    }, [])
  );

  const handleCheckConversation = useCallback(async (participant1Id, participant2Id, participant2FirstName, participant2LastName, participant2_picture) => {
    try {
      const result = await createConversation(
        participant2Id,
        participant2FirstName, 
        participant2LastName, 
        participant2_picture,
        'Hey there!' 
      );

      if (result.success) {
        const { conversationId, conversationData } = result;
        
        navigation.navigate('ChatWithDoctor', {
          conversationId,
          participant1Id,
          participant2Id,
          conversationData,
        });
      } else {
        console.log("Failed to create conversation");
      }
    } catch (error) {
      console.error("Error in handleCheckConversation:", error);
    }
  }, [createConversation, navigation]);

  const renderItem = ({ item }) => {
    const participant1Id = item.participant1Id;
    const participant2Id = item.participant2Id;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleCheckConversation(
          participant1Id === userId ? participant1Id : participant2Id, 
          participant1Id === userId ? participant2Id : participant1Id,
          item.participant1Id === userId ? item.participant2FirstName : item.participant1FirstName,
          item.participant1Id === userId ? item.participant2LastName : item.participant1LastName,
          item.participant1Id === userId ? item.participant2_picture : item.participant1_picture
        )}
        style={styles.hospitalInfoWrapStyle}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: "#F3E5F5", ...styles.chatIconWrapStyle }}>
            <Image
              source={item?.participant2_picture
                ? { uri: item.participant2_picture }
                : require('../../assets/images/user.png')}
              style={styles.doctorImageStyle}
            />
          </View>
          <View style={{ flex: 0.65, marginRight: Sizes.fixPadding - 5.0 }}>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
              {item.participant1Id === userId 
                ? `${item.participant2FirstName} ${item.participant2LastName}` 
                : `${item.participant1FirstName} ${item.participant1LastName}`}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                marginTop: Sizes.fixPadding - 8.0,
                marginBottom: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor14Medium,
              }}
            >
              {item.lastMessage}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                marginTop: Sizes.fixPadding - 8.0,
                marginBottom: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor14Medium,
              }}
            >
           {formatTimestamp(item.timestamp)} 
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <Loader isLoading={loading} /> 
        {!loading && messages.length > 0 ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
            showsVerticalScrollIndicator={false}
          />
        ) : !loading ? (
          <View style={styles.noConversationsWrap}>
            <Text style={{ textAlign: 'center', color: Colors.grayColor }}>No conversations available.</Text>
          </View>
        ) : null}
        {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
      </View>
    </View>
  );

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text numberOfLines={1} style={{ maxWidth: width - 70, ...Fonts.blackColor20Bold }}>
          Conversations
        </Text>
      </View>
    );
  }
};

export default Conversation;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
    marginBottom: 5,
  },
  chatIconWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  hospitalInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    paddingLeft: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginBottom: Sizes.fixPadding,
  },
  doctorImageStyle: {
    width: "100%",
    height: '100%',
    resizeMode: 'stretch',
    position: 'absolute',
    bottom: 0.0,
    borderRadius: 50,
  },
  noConversationsWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
