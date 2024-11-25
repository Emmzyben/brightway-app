import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  BackHandler,
  View,
  Text,
  Platform,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import AppointmentScreen from "../screens/appointment/appointmentScreen";
import DoctorsScreen from "../screens/doctors/doctorsScreen";
import HomeScreen from "../screens/home/homeScreen";
import Conversation from "../screens/conversations/conversation";
import ProfileScreen from "../screens/profile/profileScreen";
import { Fontisto, MaterialIcons, Ionicons } from "@expo/vector-icons";
import MyStatusBar from "./myStatusBar";
import Loader from '../components/activityLoader'

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true); 
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false); 
      }, 1000); 

      return () => clearTimeout(timer);
    }, [])
  );

  const backAction = () => {
    if (Platform.OS == "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount === 1 ? BackHandler.exitApp() : _spring();
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

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
    <Loader isLoading={loading} /> 
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.lightGrayColor,
          tabBarShowLabel: false,
          tabBarStyle: { ...styles.tabBarStyle },
          tabBarItemStyle: { height: 65 }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ alignItems: "center" }}>
                <View style={{ ...styles.iconWrapStyle }}>
                  <MaterialIcons name="home" size={24} color={color} />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.labelStyle,
                    color: color,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Doctors"
          component={DoctorsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ alignItems: "center" }}>
                <View style={{ ...styles.iconWrapStyle }}>
                  <Fontisto name="doctor" size={20} color={color} />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.labelStyle,
                    color: color,
                  }}
                >
                  Services
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Appointment"
          component={AppointmentScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ alignItems: "center" }}>
                <View style={{ ...styles.iconWrapStyle }}>
                  <Ionicons name="calendar" size={20} color={color} />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.labelStyle,
                    color: color,
                  }}
                >
                  Booking
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Conversation"
          component={Conversation}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ alignItems: "center" }}>
                <View style={{ ...styles.iconWrapStyle }}>
                  <MaterialIcons
                    name="local-pharmacy"
                    size={22}
                    color={color}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.labelStyle,
                    color: color,
                  }}
                >
                  Chat
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ alignItems: "center" }}>
                <View style={{ ...styles.iconWrapStyle }}>
                  <MaterialIcons name="person" size={22} color={color} />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.labelStyle,
                    color: color,
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </View>
  );

  function exitInfo() {
    return backClickCount === 1 ? (
      <View style={styles.exitWrapStyle}>
        <Text style={{ ...Fonts.whiteColor13Regular }}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }
};

const styles = StyleSheet.create({
  labelStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    fontSize: 13.0,
    fontFamily: "Mulish_Bold",
  },
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
  tabBarStyle: {
    height: 70.0,
    elevation: 3.0,
    borderTopColor: '#ececec',
    borderTopWidth: Platform.OS === 'ios' ? 0 : 1,
    backgroundColor: Colors.whiteColor,
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 0 }
  },
  iconWrapStyle: {
    width: 22.0,
    height: 22.0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTabBarScreen;
