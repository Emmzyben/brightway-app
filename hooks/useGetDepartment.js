import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, child, get } from "firebase/database";

const useGetDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `department`));

      if (snapshot.exists()) {
        const departmentsData = snapshot.val();
        const departmentsArray = Object.values(departmentsData).map(item => item.department);
        setDepartments(departmentsArray);
      } else {
        console.log("No departments found");
        setError("No departments found");
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return { departments, loading, error };
};

export default useGetDepartments;
