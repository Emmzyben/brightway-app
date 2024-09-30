import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useCallback } from "react";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS == "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      BackHandler.exitApp();
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

  setTimeout(() => {
    navigation.push("Onboarding");
  }, 2000);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle={'light-content'} />
      <ImageBackground
        source={require("../assets/images/splashBg.png")}
        style={{ flex: 1 }}
      >
        <View style={styles.contentWrapStyle}>
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              borderRadius: Sizes.fixPadding * 2.0,
              padding: Sizes.fixPadding * 2.0,
            }}
          >
            <Image
              source={require("../assets/images/appLogo.png")}
              style={{
                width: width / 8.0,
                height: width / 8.0,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text
            style={{
              marginTop: Sizes.fixPadding,
              ...Fonts.whiteColor18ExtraBold,
            }}
          >
            Brightway
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  contentWrapStyle: {
    flex: 1,
    backgroundColor: "rgba(58, 155, 195, 0.80)",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTitleStyle: {
    letterSpacing: 1.2,
    ...Fonts.whiteColor12Bold,
    position: "absolute",
    bottom: Sizes.fixPadding * 2.0,
  },
});
