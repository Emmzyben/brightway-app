import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, set, push, update } from "firebase/database";
import shortid from 'shortid';
import useFetchUserDetails from "./useFetchUserDetails";

const generateUniqueId = () => {
  return shortid.generate();
};

const generateHumanReadableTimestamp = () => {
  const date = new Date();
  return date.toLocaleString();
};

const useStoreMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userDetails, loading: loadingUser, error: userError } = useFetchUserDetails();

  const storeMessage = async (conversationId, message, participant1Id, timestamp = generateHumanReadableTimestamp()) => {
    setLoading(true);
    setError(null);

    try {
      if (loadingUser || !userDetails) {
        throw new Error("User details are not available");
      }

      if (!conversationId || !message || !participant1Id) {
        throw new Error("Missing necessary information to store the message");
      }

      const { firstName: senderFirstName, lastName: senderLastName, id: senderId } = userDetails;

      const messageId = generateUniqueId();
      const messageData = {
        messageId,
        conversationId,
        senderId,
        senderFirstName,
        senderLastName,
        participant1Id,
        message,
        timestamp,
      };

      // Store the message in the conversation's messages list
      const messageRef = ref(database, `messages/${conversationId}`);
      await push(messageRef, messageData);

      // Update only the lastMessage and timestamp fields for the conversation
      const conversationRef = ref(database, `conversations/${conversationId}`);
      await update(conversationRef, {
        lastMessage: message,
        timestamp,
      });

      console.log("Message and lastMessage updated successfully");

      return { success: true, messageId, messageData };
    } catch (err) {
      console.error("Error storing message:", err.message || err);
      setError("Failed to store message");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, storeMessage };
};

export default useStoreMessage;
