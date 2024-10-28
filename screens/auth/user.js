import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "../../firebase/firebase";
import { ref, child, get } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const fetchUsers = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'users_table'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        alert("No users found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users. Please try again.");
      return null;
    }
  };

  const login = async (usernameOrEmail, password) => {
    console.log("Attempting login...");
    try {
      const users = await fetchUsers();
      if (users) {
        const userKey = Object.keys(users).find((key) => {
          return (
            (users[key].username === usernameOrEmail ||
              users[key].email === usernameOrEmail) &&
            users[key].password === password
          );
        });

        if (userKey) {
          console.log("User found");
          const user = users[userKey];
          await AsyncStorage.setItem("userId", userKey);
          await AsyncStorage.setItem("usertype", user.usertype);
          setUser({ id: userKey, ...user });

          navigateUser(user.usertype);
        } else {
          alert("Invalid username/email or password");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const navigateUser = (usertype) => {
    switch (usertype) {
      case "user":
        navigation.navigate("BottomTabBar");
        break;
      case "provider":
        navigation.navigate("ProviderBottomTabBar");
        break;
      case "staff":
        navigation.navigate("StaffBottomTabBar");
        break;
      case "driver":
        navigation.navigate("DriverBottomTabBar");
        break;
      default:
        navigation.navigate("BottomTabBar");
    }
  };

  const checkUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      const usertype = await AsyncStorage.getItem("usertype");
      setUser({ id: userId, usertype });
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    navigation.navigate("Login");
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
