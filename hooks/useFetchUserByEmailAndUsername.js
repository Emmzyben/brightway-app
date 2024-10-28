import { useState, useEffect } from 'react';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../firebase/firebase';

const useFetchUserByEmailAndUsername = (email, username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const dbRef = ref(database, 'users_table');
        const userQuery = query(dbRef, orderByChild('email'), equalTo(email));
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
          const users = snapshot.val();
          const filteredUsers = Object.values(users).filter(user => user.username === username);

          if (filteredUsers.length > 0) {
            setUser(filteredUsers[0]); 
          } else {
            setError('No user found with the provided email and username');
          }
        } else {
          setError('No user found with the provided email');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    if (email && username) {
      fetchUser();
    }
  }, [email, username]);

  return { user, loading, error };
};

export default useFetchUserByEmailAndUsername;
