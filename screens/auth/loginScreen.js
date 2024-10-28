import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";
import { useUser } from "../auth/user";

const LoginScreen = ({ navigation }) => {
  const { login } = useUser(); 

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

  const [backClickCount, setBackClickCount] = useState(0);
  const [userNameOrEmail, setuserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [rememberPwd, setRememberPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!userNameOrEmail || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    try {
      setLoading(true); 
      await login(userNameOrEmail.toLowerCase(), password);
    } catch (error) {
      Alert.alert("Login Error", "Invalid username, email or password.");
      console.log("Login failed", error);
    }  finally {
      setLoading(false); 
  }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {welcomeInfo()}
          {userNameInfo()}
          {passwordInfo()}
          {rememberAndForgotPasswordInfo()}
          {signinButton()}
        </ScrollView>
      </View>
      {dontAccountInfo()}
      {exitInfo()}
    </View>
  );

  function dontAccountInfo() {
    return (
      <Text
        style={{
          textAlign: "center",
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor14Medium,
        }}
      >
        Don’t have an account? { }
        <Text
          onPress={() => {
            navigation.push("Signup");
          }}
          style={{ ...Fonts.primaryColor14Bold }}
        >
          Sign Up
        </Text>
      </Text>
    );
  }

  function signinButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleLogin} // Trigger login on button press
        style={styles.buttonStyle}
      >
      {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text style={{ ...Fonts.whiteColor17Bold }}>Sign In</Text>
                )}
        
      </TouchableOpacity>
    );
  }

  function rememberAndForgotPasswordInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setRememberPwd(!rememberPwd);
            }}
            style={{
              ...styles.checkBoxStyle,
              borderColor: rememberPwd ? Colors.primaryColor : Colors.grayColor,
              backgroundColor: rememberPwd
                ? Colors.primaryColor
                : Colors.whiteColor,
            }}
          >
            {rememberPwd ? (
              <MaterialIcons name="check" color={Colors.whiteColor} size={13} />
            ) : null}
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              ...Fonts.grayColor14Medium,
              marginLeft: Sizes.fixPadding - 5.0,
            }}
          >
            Remember me
          </Text>
        </View>
        <Text
          style={{
            textDecorationLine: "underline",
            ...Fonts.primaryColor14Medium,
          }}
        >
          Forget Password?
        </Text>
      </View>
    );
  }

  function passwordInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Medium }}>Password</Text>
        <View style={styles.textFieldWrapStyle}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <MaterialIcons
              name="lock"
              color={password ? Colors.primaryColor : Colors.grayColor}
              size={20}
            />
            <TextInput
              value={password}
              onChangeText={(value) => {
                setPassword(value);
              }}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              secureTextEntry={securePassword}
              placeholder="Enter Password"
              placeholderTextColor={Colors.grayColor}
            />
          </View>
          <MaterialCommunityIcons
            name={securePassword ? "eye-off" : "eye"}
            size={18}
            color={Colors.blackColor}
            onPress={() => {
              setSecurePassword(!securePassword);
            }}
          />
        </View>
      </View>
    );
  }

  function userNameInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 4.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Medium }}>Username or Email</Text>
        <View style={styles.textFieldWrapStyle}>
          <MaterialIcons
            name="person"
            color={
              userNameOrEmail ? Colors.primaryColor : Colors.lightGrayColor
            }
            size={20}
          />
          <TextInput
            value={userNameOrEmail}
            onChangeText={(value) => {
              setuserNameOrEmail(value);
            }}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            placeholder="Enter Username Or Email"
            placeholderTextColor={Colors.grayColor}
          />
        </View>
      </View>
    );
  }

  function welcomeInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 4.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...Fonts.blackColor22Bold }}>Welcome Back!</Text>
        <Text
          style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor14Medium }}
        >
          Please Sign In to continue
        </Text>
      </View>
    );
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

export default LoginScreen;

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
  buttonStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 3.0,
    marginTop: Sizes.fixPadding * 3.0,
  },
  checkBoxStyle: {
    borderWidth: 1.0,
    width: 17.0,
    height: 17.0,
    borderRadius: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
});
