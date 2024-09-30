import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  BackHandler,
  TouchableOpacity,
  Platform
} from "react-native";
import React, { useState, useCallback, createRef } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";

const { width, height } = Dimensions.get("window");

const onboardingScreenList = [
  {
    id: "1",
    onboardingImage: require("../../assets/images/onboarding/onboarding1.png"),
    onboardingTitle: "Client/Patient",
    onboardingDescription:
      "Book appointment, schedule appointment, See a provider",
  },
  {
    id: "2",
    onboardingImage: require("../../assets/images/onboarding/onboarding2.png"),
    onboardingTitle: "Provider",
    onboardingDescription:
      "Accept appointments, create appointment schedule, See patients",
  },
  {
    id: "3",
    onboardingImage: require("../../assets/images/onboarding/driver.png"),
    onboardingTitle: "Driver",
    onboardingDescription:
      "Create trips in real time, Organise your trips,",
  },
 { id: "4",
  onboardingImage: require("../../assets/images/onboarding/staff.png"),
  onboardingTitle: "Staff",
  onboardingDescription:
    "Staff management, Attendance register",
}
];

const OnboardingScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS == "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
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

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const listRef = createRef();
  const [backClickCount, setBackClickCount] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(0);

  const scrollToIndex = ({ index }) => {
    listRef.current.scrollToIndex({ animated: true, index: index });
    setCurrentScreen(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>{onboardingScreenContent()}</View>
      {nextAndIndicatorsInfo()}
      {exitInfo()}
    </View>
  );

  function nextAndIndicatorsInfo() {
    return (
      <View style={{ ...styles.indicatorButtonAndSkipWrapStyle }}>
        {indicators()}
        <TouchableOpacity
  activeOpacity={0.8}
  onPress={() => {
    currentScreen === onboardingScreenList.length - 1
      ? navigation.push("Login")
      : scrollToIndex({ index: currentScreen + 1 });
  }}
  style={styles.arrowIconWrapStyle}
>
  <MaterialIcons
    name="arrow-forward"
    color={'#f26522'}
    size={24}
  />
</TouchableOpacity>

      </View>
    );
  }

  function indicators() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {onboardingScreenList.map((item, index) => {
          return (
            <View
              key={`${item.id}`}
              style={{
                ...(currentScreen == index
                  ? styles.selectedIndicatorStyle
                  : styles.indicatorStyle),
              }}
            />
          );
        })}
      </View>
    );
  }

  function onboardingScreenContent() {
    const renderItem = ({ item }) => {
      return (
        <View style={styles.onboardingContentStyle}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={item.onboardingImage}
              style={{
                width: "100%",
                height: height / 3.2,
                resizeMode: "contain",
              }}
            />
            <View
              style={{
                marginTop: Sizes.fixPadding * 5.0,
                marginBottom: Sizes.fixPadding * 4.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
              }}
            >
              <Text style={{ textAlign: "center", ...Fonts.blackColor18Bold }}>
                {item.onboardingTitle}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  marginTop: Sizes.fixPadding + 5.0,
                  textAlign: "center",
                  ...Fonts.blackColor14Medium,
                }}
              >
                {item.onboardingDescription}
              </Text>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={listRef}
          data={onboardingScreenList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          scrollEventThrottle={32}
          pagingEnabled
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentScreen(pageNum);
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitWrapStyle}>
        <Text style={{ ...Fonts.whiteColor13Regular }}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  exitWrapStyle: {
    backgroundColor: Colors.blackColor,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIndicatorStyle: {
    marginRight: Sizes.fixPadding - 2.0,
    width: 20.0,
    height: 8.0,
    borderRadius: 4.5,
    backgroundColor: '#f26522',
  },
  indicatorStyle: {
    marginRight: Sizes.fixPadding - 2.0,
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    borderColor:'#f26522',
    borderWidth: 1.0,
  },
  indicatorButtonAndSkipWrapStyle: {
    padding: Sizes.fixPadding * 2.0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  onboardingContentStyle: {
    flex: 1,
    width: width,
    height: "100%",
    overflow: "hidden",
    justifyContent: "space-between",
  },
  arrowIconWrapStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 25.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.2,
  },
});
