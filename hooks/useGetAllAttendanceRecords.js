import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetAllAttendanceRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const attendanceRef = ref(database, `attendanceTable/${userId}`);

      const unsubscribe = onValue(attendanceRef, (snapshot) => {
        setLoading(true);
        setError(null);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const attendanceRecords = [];

          Object.keys(data).forEach((key) => {
            attendanceRecords.push({ id: key, ...data[key] });
          });

          setRecords(attendanceRecords);
        } else {
          setRecords([]); 
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching attendance records:", error.message || error);
        setError("Failed to fetch attendance records");
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  return { loading, error, records };
};

export default useGetAllAttendanceRecords;
