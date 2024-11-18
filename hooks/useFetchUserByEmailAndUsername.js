import { useState, useEffect } from 'react';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../firebase/firebase';

const useFetchUserByEmailAndUsername = (email, username) => {
  const [user, setUser] = useState(null);
  const [providerId, setProviderId] = useState(null);
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
          const filteredUser = Object.entries(users).find(
            ([key, user]) => user.username === username
          );

          if (filteredUser) {
            const [key, userData] = filteredUser;
            setUser(userData);
            setProviderId(key);
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

  return { user, providerId, loading, error };
};

export default useFetchUserByEmailAndUsername;
