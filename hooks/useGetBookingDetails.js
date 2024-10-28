import { useState, useEffect } from "react";
import { database } from "../firebase/firebase"; 
import { ref, get, child } from "firebase/database";

const useGetAppointmentDetails = (appointmentId) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      if (appointmentId) {
        const appointmentRef = child(ref(database), `driver_booking/${appointmentId}`);
        const snapshot = await get(appointmentRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const [patientId, firstName, lastName] = data.patientid.split(" ");

          setAppointmentDetails({
            id: appointmentId,
            ...data,
            patientId,
            patientFirstName: firstName,
            patientLastName: lastName,
          });
        } else {
          console.log("No appointment found with this ID");
          setError("Appointment not found");
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
