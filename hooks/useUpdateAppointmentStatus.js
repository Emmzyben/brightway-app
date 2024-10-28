import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, query, orderByChild, equalTo, get, update } from "firebase/database";

const useUpdateAppointmentStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeStatus = async (appointmentId, newStatus) => {
    setLoading(true);
    setError(null);

    try {
      const appointmentsRef = ref(database, `appointments`);
      const appointmentQuery = query(appointmentsRef, orderByChild('appointmentId'), equalTo(appointmentId));
      
      const snapshot = await get(appointmentQuery);

      if (snapshot.exists()) {
        const updates = {};
        
        // Loop through the results and update the status for the matching appointment
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key; // Get the key of the matched appointment
          updates[`/appointments/${key}/status`] = newStatus;
        });

        // Update the database with the new status
        await update(ref(database), updates);
        console.log("Appointment status updated successfully");
        return true; // Return success

      } else {
        throw new Error("Appointment not found");
      }

    } catch (err) {
      console.error("Error updating appointment status:", err.message);
      setError(err.message); // Set specific error message
      return false; // Return failure
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, changeStatus };
};

export default useUpdateAppointmentStatus;
