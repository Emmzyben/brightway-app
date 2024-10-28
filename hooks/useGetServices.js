import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, child, get } from "firebase/database";

const useGetServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `services`));

      if (snapshot.exists()) {
        const servicesData = snapshot.val();
        // Extract service names from the servicesData
        const servicesArray = Object.values(servicesData).map(item => item.service);
        setServices(servicesArray);
      } else {
        console.log("No services found");
        setError("No services found");
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, loading, error };
};

export default useGetServices;
