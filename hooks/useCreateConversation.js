import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, set, get, query, orderByChild, equalTo } from "firebase/database";
import shortid from 'shortid';
import useFetchUserDetails from "./useFetchUserDetails";

const generateUniqueId = () => {
  return shortid.generate();
};
const generateHumanReadableTimestamp = () => {
    const date = new Date();
    return date.toLocaleString(); 
  };
  
const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userDetails, loading: loadingUser, error: userError } = useFetchUserDetails();

  const checkConversationExists = async (participant1Id, participant2Id) => {
    const conversationRef = ref(database, 'conversations');

    // Query for conversations where participant1Id or participant2Id matches
    const conversationQuery1 = query(
      conversationRef,
      orderByChild('participant1Id'),
      equalTo(participant1Id)
    );
    const conversationQuery2 = query(
      conversationRef,
      orderByChild('participant2Id'),
      equalTo(participant2Id)
    );

    // Get the snapshot from Firebase
    const snapshot1 = await get(conversationQuery1);
    const snapshot2 = await get(conversationQuery2);

    // Check if any conversation already exists between the participants
    let existingConversation = null;
    snapshot1.forEach(conversation => {
      const data = conversation.val();
      if (data.participant2Id === participant2Id) {
        existingConversation = data;
      }
    });
    snapshot2.forEach(conversation => {
      const data = conversation.val();
      if (data.participant1Id === participant2Id) {
        existingConversation = data;
      }
    });

    return existingConversation;
  };

  const createConversation = async (participant2Id, participant2FirstName, participant2LastName, participant2_picture, message) => {
    setLoading(true);
    setError(null);

    try {
      // Ensure user details are loaded before proceeding
      if (loadingUser || !userDetails) {
        throw new Error("User details are not available");
      }

      console.log("Creating conversation with:", {
        participant2Id,
        participant2FirstName,
        participant2LastName,
        participant2_picture,
        message,
      });

      if (!participant2Id || !participant2FirstName || !participant2LastName || !message) {
        throw new Error("Missing necessary information to create a conversation");
      }

      const { firstName: participant1FirstName, lastName: participant1LastName, id: participant1Id } = userDetails;

      // Check if a conversation already exists
      const existingConversation = await checkConversationExists(participant1Id, participant2Id);

      if (existingConversation) {
        console.log("Conversation already exists:", existingConversation);
        return { success: true, conversationId: existingConversation.conversationId, conversationData: existingConversation };
      }

      // Generate a unique conversation ID
      const conversationId = generateUniqueId();

      // Prepare the conversation data
      const conversationData = {
        conversationId,
        participant1Id,
        participant1FirstName,
        participant1LastName,
        participant2Id,
        participant2FirstName,
        participant2LastName,
        participant2_picture,
        lastMessage: message,
        timestamp:generateHumanReadableTimestamp()
      };

      // Create a new conversation entry in Firebase under the "conversations" table
      const conversationRef = ref(database, `conversations/${conversationId}`);
      await set(conversationRef, conversationData);

      console.log("Conversation created successfully");

      return { success: true, conversationId, conversationData };
    } catch (err) {
      console.error("Error creating conversation:", err.message || err);
      setError("Failed to create conversation");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createConversation };
};

export default useCreateConversation;
