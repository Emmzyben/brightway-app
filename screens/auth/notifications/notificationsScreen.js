import React, { useState, useRef } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { Snackbar } from "react-native-paper";
import {
  Dimensions,
  FlatList,
  Animated,
  View,
  StyleSheet,
  Text,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";

const { width, height } = Dimensions.get("window");

const todaysNotificatiosList = [
  {
    key: "1",
    title: "Remind for Appointment",
    description:
      "Lorem ipsum dolor sit amet, consectetur aucto  adipiscing elit.",
    time: "11 Min",
    bgColor: "#F3E5F5",
    iconColor: Colors.purpleColor,
  },
  {
    key: "2",
    title: "Appointment Cancel by Patient.",
    description:
      "Lorem ipsum dolor sit amet, consectetur aucto  adipiscing elit.",
    time: "25 Min",
    bgColor: "#E3F2FD",
    iconColor: Colors.blueColor,
  },
];

const yesterdaysNotificationsList = [
  {
    key: "1",
    title: "New Appointment!",
    description:
      "Lorem ipsum dolor sit amet, consectetur aucto  adipiscing elit.",
    time: "11:42 pm",
    bgColor: "#E0F2F1",
    iconColor: Colors.greenColor,
  },
  {
    key: "2",
    title: "New Appointment!",
    description:
      "Lorem ipsum dolor sit amet, consectetur aucto  adipiscing elit.",
    time: "11:30 pm",
    bgColor: "#E8F5E9",
    iconColor: Colors.parrotColor,
  },
  {
    key: "3",
    title: "Appointment Cancel by Patient.",
    description:
      "Lorem ipsum dolor sit amet, consectetur aucto  adipiscing elit.",
    time: "11:30 pm",
    bgColor: "#F3E5F5",
    iconColor: Colors.purpleColor,
  },
  {
    key: "4",
    title: "New Appointment!",
    description:
      "Lorem ipsum dolor sit amet, consectetur aucto  adipiscing elit.",
    time: "11:00 pm",
    bgColor: "#E3F2FD",
    iconColor: Colors.blueColor,
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState("");

  const [listData, setListData] = useState(todaysNotificatiosList);

  const [oldListData, setOldListData] = useState(yesterdaysNotificationsList);

  Array(listData.length + 1)
    .fill("")
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  Array(oldListData.length + 1)
    .fill("")
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {notifications()}
      </View>
      {snackBar()}
    </View>
  );

  function notifications() {
    return (
      <FlatList
        ListHeaderComponent={
          listData.length == 0 && oldListData.length == 0
            ?
            (noNotoficationInfo())
            :
            (
              <>
                {todayNotifications()}
                <View
                  style={{ height: 10.0, backgroundColor: Colors.bodyBackColor }}
                />
                {yesterDayNotifications()}
                <View
                  style={{ height: 10.0, backgroundColor: Colors.bodyBackColor }}
                />
              </>
            )
        }
        contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function noNotoficationInfo() {
    return (
      <View
        style={{
          height: height - 120,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="notifications-off-sharp"
          size={24}
          color={Colors.lightGrayColor}
          style={{ marginBottom: Sizes.fixPadding + 5.0 }}
        />
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 5.0,
            ...Fonts.grayColor16SemiBold,
            textAlign: "center",
          }}
        >
          No Notifications yet
        </Text>
        <Text
          style={{
            ...Fonts.grayColor14Medium,
            marginHorizontal: Sizes.fixPadding * 4.0,
            textAlign: "center",
          }}
        >
          Stay turned! Notifications about your activity will show up here.
        </Text>
      </View>
    );
  }

  function snackBar() {
    return (
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        elevation={0.0}
      >
        <Text style={{ ...Fonts.whiteColor14Medium }}>{snackBarMsg}</Text>
      </Snackbar>
    );
  }

  function yesterDayNotifications() {
    const oldOnSwipeValueChange = (swipeData) => {
      const { key, value } = swipeData;
      if (value > width || (value < -width && !animationIsRunning.current)) {
        animationIsRunning.current = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          const newData = [...oldListData];
          const prevIndex = oldListData.findIndex((item) => item.key === key);
          newData.splice(prevIndex, 1);
          const removedItem = oldListData.find((item) => item.key === key);
          setSnackBarMsg(`${removedItem.title} dismissed`);
          setOldListData(newData);
          setShowSnackBar(true);
          animationIsRunning.current = false;
        });
      }
    };

    const oldRenderItem = (data) => (
      <View>
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
          <View
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginBottom:
                data.index == oldListData.length - 1
                  ? Sizes.fixPadding * 2.0
                  : 0.0,
            }}
          >
            <View style={{ flexDirection: "row", marginTop: Sizes.fixPadding * 2.0 }}>
              <View
                style={{
                  backgroundColor: data.item.bgColor,
                  ...styles.notificationIconWrapStyle,
                }}
              >
                <Ionicons
                  name="notifications"
                  size={20}
                  color={data.item.iconColor}
                />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    numberOfLines={1}
                    style={{ flex: 1, ...Fonts.blackColor16Medium }}
                  >
                    {data.item.title}
                  </Text>
                  <Text style={{ ...Fonts.grayColor12SemiBold }}>
                    {data.item.time}
                  </Text>
                </View>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                  {data.item.description}
                </Text>
              </View>
            </View>
            {data.index == oldListData.length - 1 ? null : (
              <View
                style={{
                  backgroundColor: Colors.bodyBackColor,
                  height: 1.0,
                  marginTop: Sizes.fixPadding * 2.0,
                }}
              />
            )}
          </View>
        </View>
      </View>
    );

    const oldRenderHiddenItem = (data) => (
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          flex: 1,
          marginTop: Sizes.fixPadding * 2.0,
        }}
      />
    );

    return oldListData.length == 0 ? null : (
      <View style={{ backgroundColor: Colors.whiteColor }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Yesterday
        </Text>
        <SwipeListView
          listKey={`olds`}
          data={oldListData}
          renderItem={oldRenderItem}
          renderHiddenItem={oldRenderHiddenItem}
          rightOpenValue={-width}
          leftOpenValue={width}
          onSwipeValueChange={oldOnSwipeValueChange}
          useNativeDriver={false}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function todayNotifications() {
    const onSwipeValueChange = (swipeData) => {
      const { key, value } = swipeData;
      if (value > width || (value < -width && !animationIsRunning.current)) {
        animationIsRunning.current = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          const newData = [...listData];
          const prevIndex = listData.findIndex((item) => item.key === key);
          newData.splice(prevIndex, 1);
          const removedItem = listData.find((item) => item.key === key);
          setSnackBarMsg(`${removedItem.title} dismissed`);
          setListData(newData);
          setShowSnackBar(true);
          animationIsRunning.current = false;
        });
      }
    };

    const renderItem = (data) => (
      <View>
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
          <View
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginBottom:
                data.index == listData.length - 1
                  ? Sizes.fixPadding * 2.0
                  : 0.0,
            }}
          >
            <View style={{ flexDirection: "row", marginTop: Sizes.fixPadding * 2.0, }}>
              <View
                style={{
                  backgroundColor: data.item.bgColor,
                  ...styles.notificationIconWrapStyle,
                }}
              >
                <Ionicons
                  name="notifications"
                  size={20}
                  color={data.item.iconColor}
                />
              </View>
              <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    numberOfLines={1}
                    style={{ flex: 1, ...Fonts.blackColor16Medium }}
                  >
                    {data.item.title}
                  </Text>
                  <Text style={{ ...Fonts.grayColor12SemiBold }}>
                    {data.item.time}
                  </Text>
                </View>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                  {data.item.description}
                </Text>
              </View>
            </View>
            {data.index == listData.length - 1 ? null : (
              <View
                style={{
                  backgroundColor: Colors.bodyBackColor,
                  height: 1.0,
                  marginTop: Sizes.fixPadding * 2.0,
                }}
              />
            )}
          </View>
        </View>
      </View>
    );

    const renderHiddenItem = (data) => {
      return (
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            flex: 1,
            marginTop: Sizes.fixPadding * 2.0,
          }}
        />
      );
    };

    return listData.length == 0 ? null : (
      <View style={{ backgroundColor: Colors.whiteColor }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Today
        </Text>
        <SwipeListView
          listKey={`todays`}
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-width}
          leftOpenValue={width}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          scrollEnabled={false}
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
          Notification
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

export default NotificationsScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    padding: Sizes.fixPadding * 2.0,
  },
  notificationIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: Sizes.fixPadding - 3.0,
    alignItems: "center",
    justifyContent: "center",
  },
});
