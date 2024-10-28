import { useState, useEffect } from "react"; 
import { database } from "../firebase/firebase";
import { ref, child, get } from "firebase/database";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users_table`));

      if (snapshot.exists()) {
        const userData = snapshot.val();
        // Filter users and map to extract only firstName and lastName
        const filteredUsers =Object.entries(userData)
        .filter(([key, user])=> user.usertype === "user")
        .map(([key, user]) => ({
          id: key, 
            firstName: user.firstName,
            lastName: user.lastName,
          }));
        
        setUsers(filteredUsers);
      } else {
        console.log("No users found in database");
        setError("No users found");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;
