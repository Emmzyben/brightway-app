import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchUserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async (userId) => {
    return new Promise((resolve, reject) => {
      const userRef = ref(database, `users_table/${userId}`);
      onValue(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    let unsubscribe;

    const fetchAppointmentsRealTime = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = await AsyncStorage.getItem("userId");
        console.log("User ID from AsyncStorage:", userId);

        if (userId) {
          const appointmentsRef = ref(database, "driver_booking");
          const appointmentsQuery = query(
            appointmentsRef,
            orderByChild("driverId"),
            equalTo(userId)
          );

          unsubscribe = onValue(
            appointmentsQuery,
            async (snapshot) => {
              if (snapshot.exists()) {
                const appointmentsData = snapshot.val();
                console.log("Appointments data:", appointmentsData);

                const appointmentsArray = await Promise.all(
                  Object.keys(appointmentsData).map(async (key) => {
                    const appointment = { id: key, ...appointmentsData[key] };

                    // Directly fetch patient and staff details
                    const patientId = appointment.patientid
                      ? appointment.patientid.split(" ")[0]
                      : null;
                    const staffId = appointment.staffId ? appointment.staffId : null;

                    const patientDetails = patientId
                      ? await fetchUserDetails(patientId)
                      : null;
                    console.log("Patient details:", patientDetails);

                    const staffDetails = staffId
                      ? await fetchUserDetails(staffId)
                      : null;
                    console.log("Staff details:", staffDetails);

                    return {
                      ...appointment,
                      appointmentId: key, // Add appointmentId here
                      patient_firstName: patientDetails?.firstName || "Unknown",
                      patient_lastName: patientDetails?.lastName || "Unknown",
                      patientProfilePicture: patientDetails?.profile_picture || null,
                      staff_firstName: staffDetails?.firstName || "Unknown",
                      staff_lastName: staffDetails?.lastName || "Unknown",
                      staffProfilePicture: staffDetails?.profile_picture || null,
                    };
                  })
                );

                setAppointments(appointmentsArray);
                console.log("Fetched appointments:", appointmentsArray);
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
        setError("Failed to set up real-time listener");
        setLoading(false);
      }
    };

    fetchAppointmentsRealTime();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      setAppointments([]); // Clear appointments state on unmount
    };
  }, []);

  return { appointments, loading, error };
};

export default useFetchUserAppointments;
