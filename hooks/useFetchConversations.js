import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchConversations = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const conversationsRef = ref(database, 'conversations');

      onValue(conversationsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const filteredMessages = Object.values(data).filter(
            (conversation) =>
              conversation.participant1Id === userId ||
              conversation.participant2Id === userId
          );
          setMessages(filteredMessages);
        } else {
          setMessages([]);
        }
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { messages, loading, error, fetchMessages };
};

export default useFetchConversations;
