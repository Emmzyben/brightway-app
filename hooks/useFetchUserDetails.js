import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, child, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const dbRef = ref(database);
        
        const snapshot = await get(child(dbRef, `users_table/${userId}`));
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserDetails({
            id: userId, 
            ...userData
          });
        } else {
          console.log("No user found with the given userId");
          setError("No user found");
        }
      } else {
        console.log("No userId found in AsyncStorage");
        setError("No user logged in");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return { userDetails, loading, error };
};

export default useFetchUserDetails;
