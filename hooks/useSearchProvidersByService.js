import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, get, child, query, orderByChild, equalTo } from 'firebase/database';

const useSearchProvidersByService = (service) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvidersByService = async () => {
      setLoading(true);
      setError(null);

      try {
        const dbRef = ref(database);
        const snapshot = await get(query(child(dbRef, 'users_table'), orderByChild('usertype'), equalTo('provider')));

        if (snapshot.exists()) {
          const users = snapshot.val();
          const filteredProviders = Object.values(users).filter(user => user.services && user.services.includes(service));
          
          if (filteredProviders.length > 0) {
            setProviders(filteredProviders);
          } else {
            setError('No providers found for this service');
          }
        } else {
          setError('No providers found');
        }
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to fetch providers');
      } finally {
        setLoading(false);
      }
    };

    if (service) {
      fetchProvidersByService();
    }
  }, [service]);

  return { providers, loading, error };
};

export default useSearchProvidersByService;
