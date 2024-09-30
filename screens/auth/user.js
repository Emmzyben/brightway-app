import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../../firebase/firebase";
import {ref, child, get } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

 
  const login = async (usernameOrEmail, password) => {
    console.log("Attempting login...");
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'users_table'));
  
      if (snapshot.exists()) {
        console.log("Snapshot exists");
        
        const users = snapshot.val();
        console.log("Users object:", users);
  
        if (users) {
          const userKey = Object.keys(users).find((key) => {
            return (
              (users[key].username === usernameOrEmail ||
                users[key].email === usernameOrEmail) &&
              users[key].password === password
            );
          });
  
          console.log("UserKey:", userKey);
  
          if (userKey) {
            console.log("User found");
            const user = users[userKey];
            await AsyncStorage.setItem("userId", userKey);
            await AsyncStorage.setItem("accountType", user.accountType);
            setUser({ id: userKey, ...user });
  
            // Navigate based on accountType
            switch (user.accountType) {
              case "user":
                console.log("Navigating to HomeScreen");
                navigation.navigate("BottomTabBar");
                break;
              case "provider":
                console.log("Navigating to ProviderDashboard");
                navigation.navigate("ProviderBottomTabBar");
                break;
              case "staff":
                console.log("Navigating to StaffDashboard");
                navigation.navigate("StaffBottomTabBar");
                break;
              case "driver":
                console.log("Navigating to DriverDashboard");
                navigation.navigate("DriverBottomTabBar");
                break;
              default:
                console.log("Navigating to DefaultDashboard");
                navigation.navigate("BottomTabBar");
            }
          } else {
            console.log("Invalid username/email or password");
            alert("Invalid username/email or password");
          }
        } else {
          console.log("Users data is empty or undefined");
          alert("No users found");
        }
      } else {
        console.log("No snapshot data found");
        alert("No users found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  
  
  

  const checkUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      const accountType = await AsyncStorage.getItem("accountType");
      setUser({ id: userId, accountType });
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    navigation.navigate("LoginScreen");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </UserContext.Provider>
  );
};
