import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, set } from "firebase/database";
import shortid from 'shortid';

const generateUniqueId = () => {
  return shortid.generate();
};

const useCreateSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSchedule = async (scheduleDetails) => {
    setLoading(true);
    setError(null);

    // Validate input fields
    if (
      !scheduleDetails.scheduleFromTime || 
      !scheduleDetails.scheduleToTime || 
      !scheduleDetails.providerId
    ) {
      setError("All fields are required");
      setLoading(false);
      return false;
    }

    try {
      // Generate a unique ID for the schedule
      const scheduleId = generateUniqueId();

      // Prepare the schedule data
      const scheduleData = {
        scheduleId,
        ...scheduleDetails, // spread the passed details
      };

      // Reference to the Firebase path for the schedule
      const scheduleRef = ref(database, `provider_schedules/${scheduleId}`);
      
      // Set the schedule data in Firebase
      await set(scheduleRef, scheduleData);

      console.log("Schedule created successfully");
      return { success: true, scheduleData };
      
    } catch (err) {
      console.error("Error creating schedule:", err.message || err);
      setError("Failed to create schedule");
      return false;
      
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createSchedule };
};

export default useCreateSchedule;
