import { useState, useEffect } from "react";
import { database } from "../firebase/firebase"; 
import { ref, get, child, onValue } from "firebase/database";

const useGetAppointmentDetails = (appointmentId) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
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
          const staffId = data.staffId;

          // Fetch patient and staff details
          const patientDetails = patientId ? await fetchUserDetails(patientId) : null;
          const staffDetails = staffId ? await fetchUserDetails(staffId) : null;

          setAppointmentDetails({
            id: appointmentId,
            ...data,
            patientId,
            patientFirstName: firstName,
            patientLastName: lastName,
            patientProfilePicture: patientDetails?.profile_picture || null,
            staffId,
            staffFirstName: staffDetails?.firstName || "Unknown",
            staffLastName: staffDetails?.lastName || "Unknown",
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
