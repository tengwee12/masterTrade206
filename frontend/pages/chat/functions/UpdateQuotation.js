import React from "react";
import { Alert } from "react-native";
import { collection, addDoc, getDocs, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from "../../../services/firebase";
import { getItem } from "expo-secure-store";

const UpdateQuotation = async (currentQuotation, issue, otherEmail, updateDisplay) => {
  try {
    const userEmail = getItem("email");
    const isPlumber = getItem("isPlumber");
    const quotationRef = collection(database, "quotations");
    let q, otherUser, currentUser;

    if (isPlumber === "true") {
      q = query(
        quotationRef,
        where("userEmail", "==", otherEmail),
        where("plumberName", "==", userEmail),
        where("issue", "==", issue)
      );
      otherUser = otherEmail;
      currentUser = userEmail;
    } else {
      q = query(
        quotationRef,
        where("userEmail", "==", userEmail),
        where("plumberName", "==", otherEmail),
        where("issue", "==", issue)
      );
      otherUser = userEmail;
      currentUser = otherEmail;
    }

    const querySnapshot = await getDocs(q);

    // Prompt for a new quotation value
    Alert.prompt(
      "Edit Quotation",
      "Enter your new quote ($)",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: async (newValue) => {
            // Check if the input is a valid integer
            const intValue = parseInt(newValue);
            if (!isNaN(intValue)) {
              // If no document found, add a new document
              if (querySnapshot.empty) {
                await addDoc(quotationRef, {
                  userEmail: otherUser,
                  plumberName: currentUser,
                  quotation: `${intValue}`,
                  issue: issue,
                  updatedAt: serverTimestamp(),
                });
              } else {
                // Update existing documents with the new quotation
                querySnapshot.forEach(async (doc) => {
                  await updateDoc(doc.ref, {
                    quotation: `${intValue}`,
                    updatedAt: serverTimestamp(),
                  });
                });
              }

              // Inform the user that the offer has been updated
              Alert.alert(
                "Quotation Updated",
                "Your offer has been successfully updated."
              );

              // Call the callback function to update the display
              updateDisplay(newValue);
            } else {
              // Inform the user if the input is invalid
              Alert.alert(
                "Invalid Input!",
                "Please enter a valid integer value."
              );
            }
          },
        },
      ],
      "plain-text", // Specify the input type
      currentQuotation.toString() // Initial value for the input field
    );
  } catch (error) {
    console.error("Error updating quotation:", error);
  }
};

export default UpdateQuotation;
