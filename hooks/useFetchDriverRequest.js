import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const appointmentsRef = ref(database, "driver_booking");

        const appointmentsQuery = query(
          appointmentsRef,
          orderByChild("driverId"),
          equalTo(userId)
        );

        const snapshot = await get(appointmentsQuery);

        if (snapshot.exists()) {
          const appointmentsData = snapshot.val();
          const appointmentsArray = Object.keys(appointmentsData).map((key) => ({
            id: key,
            ...appointmentsData[key],
          }));
          appointmentsArray.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));

          setAppointments(appointmentsArray);
        } else {
          console.log("No appointments found for the user");
          setAppointments([]); 
        }
      } else {
        console.log("No userId found in AsyncStorage");
        setError("No user logged in");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointments, loading, error, fetchAppointments };
};

export default useFetchAppointments;
