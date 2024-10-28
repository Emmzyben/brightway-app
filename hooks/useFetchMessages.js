import { useState, useEffect } from "react";
import { database } from "../firebase/firebase";
import { ref, onValue, off } from "firebase/database";

const useFetchMessages = (conversationId, participant1Id) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!conversationId || !participant1Id) {
      setError("Invalid conversation or participant ID");
      return;
    }

    const messagesRef = ref(database, `messages/${conversationId}`);
    
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        onValue(messagesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const filteredMessages = Object.values(data).filter(
              (message) => message.participant1Id === participant1Id
            );
            setMessages(filteredMessages);
          } else {
            setMessages([]);
          }
        });
      } catch (err) {
        console.error("Error fetching messages:", err.message || err);
        setError("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Cleanup listener when the component unmounts
    return () => {
      off(messagesRef);
    };
  }, [conversationId, participant1Id]);

  return { messages, loading, error };
};

export default useFetchMessages;
