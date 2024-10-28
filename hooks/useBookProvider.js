import { useState } from "react";
import { database } from "../firebase/firebase";
import { ref, set, get, query, orderByChild, equalTo } from "firebase/database";
import useFetchUserDetails from "./useFetchUserDetails";
import shortid from 'shortid';

const generateUniqueId = () => {
  return shortid.generate();
};

const useBookProvider = () => {
  const { userDetails, loading: loadingUser, error: userError } = useFetchUserDetails();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProviderId = async (providerEmail, providerUsername) => {
    try {
      // Create a query to search for the provider by email and username
      const usersRef = ref(database, "users_table");
      const emailQuery = query(usersRef, orderByChild("email"), equalTo(providerEmail));
      const usernameQuery = query(usersRef, orderByChild("username"), equalTo(providerUsername));

      // Fetch data for both queries
      const [emailSnapshot, usernameSnapshot] = await Promise.all([get(emailQuery), get(usernameQuery)]);

      let providerId = null;

      if (emailSnapshot.exists() && usernameSnapshot.exists()) {
        // Check if both match for the same user
        const emailData = emailSnapshot.val();
        const usernameData = usernameSnapshot.val();

        const emailUserId = Object.keys(emailData)[0]; // Get the first key (user ID) for email
        const usernameUserId = Object.keys(usernameData)[0]; // Get the first key (user ID) for username

        if (emailUserId === usernameUserId) {
          providerId = emailUserId;
        } else {
          throw new Error("Email and username do not match the same provider");
        }
      }

      if (!providerId) {
        throw new Error("Provider not found");
      }

      return providerId;
    } catch (err) {
      console.error("Error fetching provider ID:", err.message || err);
      throw new Error("Failed to fetch provider ID");
    }
  };

  const bookAppointment = async (appointmentDetails) => {
    setLoading(true);
    setError(null);

    if (!appointmentDetails.bookDate || !appointmentDetails.bookTime) {
      setError("Appointment date and time are required");
      setLoading(false);
      return false;
    }

    try {
      if (userDetails) {
        const { firstName, lastName, profile_picture, email, id } = userDetails;

        // Fetch the provider ID from users_table
        const providerId = await fetchProviderId(appointmentDetails.providerEmail, appointmentDetails.ProviderUsername);

        // Generate a unique appointment ID
        const appointmentId = generateUniqueId();

        const appointmentData = {
          ...appointmentDetails,
          appointmentId, // Use unique appointment ID
          patientId: id,
          patient_firstName: firstName,
          patient_lastName: lastName,
          patient_profile_picture: profile_picture,
          patient_email: email,
          providerId, // Include the fetched provider ID
          status: "pending",
        };

        // Create a new appointment entry under a unique path (using appointmentId)
        const appointmentsRef = ref(database, `appointments/${appointmentId}`);
        await set(appointmentsRef, appointmentData);

        console.log("Appointment booked successfully");
        return { success: true, appointmentData }; 
      } else {
        console.log("User details not available");
        setError("User details not found");
        return false; // Indicate failure
      }
    } catch (err) {
      console.error("Error booking appointment:", err.message || err);
      setError("Failed to book appointment");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loadingUser, userError, bookAppointment };
};

export default useBookProvider;
