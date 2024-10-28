import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, set, get } from "firebase/database";

const useCreateAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAttendance = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      // Get today's date in a format suitable for your database (e.g., YYYY-MM-DD)
      const today = new Date().toISOString().split("T")[0];

      // Reference to the attendance table for the specific user
      const attendanceRef = ref(database, `attendanceTable/${userId}/${today}`);
      const snapshot = await get(attendanceRef);

      let attendanceData = {
        userId: userId,
        date: today,
        time: new Date().toISOString(),
      };

      // Check if there's already a clock in or clock out for today
      if (snapshot.exists()) {
        const record = snapshot.val();

        // If there's already a clock in, store clock out
        if (record.clockIn && !record.clockOut) {
          attendanceData = {
            ...attendanceData,
            type: "Clock Out",
          };
          await set(attendanceRef, { ...record, clockOut: attendanceData.time });
          console.log("Clock Out recorded successfully");
          setError("Clocked out successfully");
          return { success: true, message: "Clocked out successfully" };
        } 
        // If there's already a clock out, return error message
        else if (record.clockOut) {
          console.log("Already clocked out for the day");
          setError("Already clocked out for the day");
          return { success: false, message: "Already clocked out for the day" };
          
        }
      } else {
        // If no record exists for today, store clock in
        attendanceData.type = "Clock In";
        await set(attendanceRef, { ...attendanceData, clockIn: attendanceData.time });
        console.log("Clock In recorded successfully");
        setError("Clock In recorded successfully");
        return { success: true, message: "Clocked in successfully" };
      }
    } catch (err) {
      console.error("Error creating attendance record:", err.message || err);
      return { success: false, message: "Failed to create attendance record" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createAttendance };
};

export default useCreateAttendance;
