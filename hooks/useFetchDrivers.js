import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, child, get } from "firebase/database";

const useFetchDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrivers = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users_table`));

      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        const driverData = Object.entries(userData)
          .filter(([key, user]) => user.usertype === "driver")
          .map(([key, user]) => ({
            id: key, // This is the document ID
            ...user // Spread the user data
          }));

        setDrivers(driverData); 
      } else {
        console.log("No drivers found");
        setError("No drivers found");
      }
    } catch (err) {
      console.error("Error fetching drivers:", err);
      setError("Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return { drivers, loading, error };
};

export default useFetchDrivers;
