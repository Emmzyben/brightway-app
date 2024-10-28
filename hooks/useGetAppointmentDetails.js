import { useState, useEffect } from "react";
import { database } from "../firebase/firebase"; 
import { ref, get, child, getDatabase } from "firebase/database";

const useGetAppointmentDetails = (appointmentId) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      if (appointmentId) {
        const dbRef = ref(database, 'appointments');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const appointments = snapshot.val();
          const appointmentArray = Object.keys(appointments).map(key => ({
            id: key,
            ...appointments[key]
          }));

          // Find the appointment with the matching appointmentId
          const foundAppointment = appointmentArray.find(
            appointment => appointment.appointmentId === appointmentId
          );

          if (foundAppointment) {
            setAppointmentDetails(foundAppointment);
          } else {
            console.log("No appointment found with this ID");
            setError("Appointment not found");
          }
        } else {
          console.log("No appointments found");
          setError("No appointments available");
        }
      } else {
        console.log("No appointment ID provided");
        setError("Invalid appointment ID");
      }
    } catch (err) {
      console.error("Error fetching appointment details:", err);
      setError("Failed to fetch appointment details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentDetails();
  }, [appointmentId]); 

  return { appointmentDetails, loading, error };
};

export default useGetAppointmentDetails;
