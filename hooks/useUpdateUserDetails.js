import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, update } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUpdateUserDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserDetails = async (updatedDetails) => {
    setLoading(true);
    setError(null);
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const userRef = ref(database, `users_table/${userId}`);
        await update(userRef, updatedDetails);
        
        console.log("User details updated successfully");
      } else {
        console.log("No userId found in AsyncStorage");
        setError("No user logged in");
      }
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Failed to update user details");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateUserDetails };
};

export default useUpdateUserDetails;
