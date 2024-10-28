import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

const useGetAttendanceRecords = (userId) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const attendanceRef = ref(database, `attendanceTable/${userId}`);

    const unsubscribe = onValue(attendanceRef, (snapshot) => {
      setLoading(true);
      setError(null);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const today = new Date().toISOString().split("T")[0];
        const attendanceRecords = [];

        // Check if there are records for today
        if (data[today]) {
          const record = data[today];
          if (record.clockIn) {
            attendanceRecords.push({ type: "Clock In", time: record.clockIn });
          }
          if (record.clockOut) {
            attendanceRecords.push({ type: "Clock Out", time: record.clockOut });
          }
        }
        setRecords(attendanceRecords);
      } else {
        setRecords([]); 
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching attendance records:", error.message || error);
      setError("Failed to fetch attendance records");
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId]);

  return { loading, error, records };
};

export default useGetAttendanceRecords;
