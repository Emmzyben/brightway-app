import { useState, useEffect, useCallback } from "react";
import { database } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const dbRef = ref(database, "provider_schedules");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const allSchedules = snapshot.val();

          const filteredSchedules = Object.keys(allSchedules)
            .map(key => ({
              id: key,
              ...allSchedules[key]
            }))
            .filter(schedule => schedule.providerId === userId);

          setSchedules(filteredSchedules);
        } else {
          setError("No schedules found");
        }
      } else {
        console.log("No userId found in AsyncStorage");
        setError("No user logged in");
      }
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError("Failed to fetch schedules");
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchSchedules(); 
  }, [fetchSchedules]);

  return { schedules, loading, error, refetch: fetchSchedules }; 
};

export default useFetchSchedules;
