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
import { useUser } from "./auth/user";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const { checkUser, user } = useUser(); 

  const backAction = () => {
    if (Platform.OS === "ios") {
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

  useFocusEffect(
    useCallback(() => {
      const checkAndRedirect = async () => {
        // Check if user is logged in
        await checkUser();

        setTimeout(() => {
          if (user) {
            switch (user.usertype) {
              case "user":
                navigation.replace("BottomTabBar");
                break;
              case "provider":
                navigation.replace("ProviderBottomTabBar");
                break;
              case "staff":
                navigation.replace("StaffBottomTabBar");
                break;
              case "driver":
                navigation.replace("DriverBottomTabBar");
                break;
              default:
                navigation.replace("BottomTabBar");
                break;
            }
          } else {
            navigation.replace("Onboarding");
          }
        }, 2000); 
      };

      checkAndRedirect();
    }, [user, navigation])
  );

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
