import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchUserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentsRealTime = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = await AsyncStorage.getItem("userId");

        if (userId) {
          const appointmentsRef = ref(database, "appointments");

          const appointmentsQuery = query(
            appointmentsRef,
            orderByChild("providerId"),
            equalTo(userId)
          );

          // Real-time listener with `onValue`
          onValue(
            appointmentsQuery,
            (snapshot) => {
              if (snapshot.exists()) {
                const appointmentsData = snapshot.val();
                const appointmentsArray = Object.keys(appointmentsData).map((key) => ({
                  id: key,
                  ...appointmentsData[key],
                }));
                setAppointments(appointmentsArray);
              } else {
                console.log("No appointments found for the user");
                setAppointments([]); 
              }
              setLoading(false);
            },
            (errorObject) => {
              console.error("Error fetching appointments:", errorObject);
              setError("Failed to fetch appointments");
              setLoading(false);
            }
          );
        } else {
          console.log("No userId found in AsyncStorage");
          setError("No user logged in");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error setting up real-time listener:", err);
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointmentsRealTime();

    // Cleanup listener when component unmounts
    return () => setAppointments([]);

  }, []);

  return { appointments, loading, error };
};

export default useFetchUserAppointments;
