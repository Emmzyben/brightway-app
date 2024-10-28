import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, get, update } from "firebase/database";

const useUpdateAppointmentStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeStatus = async (appointmentId, newStatus) => {
    setLoading(true);
    setError(null);

    try {
      const appointmentRef = ref(database, `driver_booking/${appointmentId}`);
      const snapshot = await get(appointmentRef);

      if (snapshot.exists()) {
        // Update the status field directly
        await update(appointmentRef, { status: newStatus });
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
