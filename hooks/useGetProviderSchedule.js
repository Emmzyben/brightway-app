import { useState, useEffect } from 'react';
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

const useGetProviderSchedules = (providerId) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to parse "HH:MM AM/PM" into a Date object
  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  useEffect(() => {
    if (!providerId) return;

    const fetchSchedules = () => {
      setLoading(true);
      const schedulesRef = ref(database, `provider_schedules`);
      console.log(`Fetching schedules for provider ID: ${providerId}`);

      onValue(schedulesRef, (snapshot) => {
        if (snapshot.exists()) {
          const scheduleData = Object.values(snapshot.val()).filter(
            (schedule) => schedule.providerId === providerId
          );
          console.log("Fetched schedule data:", scheduleData);

          const scheduleHours = [];

          scheduleData.forEach(schedule => {
            const start = parseTime(schedule.scheduleFromTime);
            const end = parseTime(schedule.scheduleToTime);

            let current = new Date(start);
            while (current < end) {
              const hours = String(current.getHours()).padStart(2, '0');
              const minutes = String(current.getMinutes()).padStart(2, '0');
              scheduleHours.push(`${hours}:${minutes}`);
              current.setHours(current.getHours() + 1);
            }
          });

          setSchedules(scheduleHours);
          setError(null);
        } else {
          console.log("No schedules found for this provider.");
          setError('No schedules found for this provider.');
          setSchedules([]);
        }
        setLoading(false);
      }, (err) => {
        console.error("Error fetching schedules:", err);
        setError(err.message || 'Failed to fetch schedules');
        setLoading(false);
      });
    };

    fetchSchedules();
  }, [providerId]);

  return { schedules, loading, error };
};

export default useGetProviderSchedules;
