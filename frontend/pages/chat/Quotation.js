import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, StatusBar } from "react-native";
import Button from "../../components/Button";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "../../services/firebase";
import { getItem } from "expo-secure-store";

const Quotation = ({ plumberName, quotation }) => {
  const userEmail = getItem("email");
  [quotation, setQuotation] = useState(quotation);

  //TODO : Complete the transaction and confirm date and time
  const handleCompletePress = () => {
    Alert.alert(
      "Job Completed",
      "Congratulations! The job has been completed."
    );
  };

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const quotationRef = collection(database, "quotations");
        const q = query(
          quotationRef,
          where("userEmail", "==", userEmail),
          where("plumberName", "==", plumberName)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // If quotation exists, set the quotation state
          const data = querySnapshot.docs[0].data();
          setQuotation(data.quotation);
        } else {
          // If quotation does not exist, set default quotation to $50
          setQuotation("50");
          // Add default quotation to the database
          await addDoc(quotationRef, {
            userEmail: userEmail,
            plumberName: plumberName,
            quotation: "50",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error("Error fetching quotation:", error);
      }
    };

    fetchQuotation();
  }, []);

  //TODO : be able to edit the offer
  const handleEditOffer = async () => {
    try {
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
                // Check if the quotation already exists in the database
                const quotationRef = collection(database, "quotations");
                const q = query(
                  quotationRef,
                  where("userEmail", "==", userEmail),
                  where("plumberName", "==", plumberName)
                );
                const querySnapshot = await getDocs(q);

                // If no document found, add a new document
                if (querySnapshot.empty) {
                  await addDoc(quotationRef, {
                    userEmail: userEmail,
                    plumberName: plumberName,
                    quotation: `${newValue}`,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                  });
                } else {
                  // Update existing documents with the new quotation
                  querySnapshot.forEach(async (doc) => {
                    await updateDoc(doc.ref, {
                      quotation: `${newValue}`,
                      updatedAt: serverTimestamp(),
                    });
                  });
                }

                // Update the quotation in the component state
                setQuotation(newValue);

                // Inform the user that the offer has been updated
                Alert.alert(
                  "Quotation Updated",
                  "Your offer has been successfully updated."
                );
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
        quotation.replace("$", "") // Initial value for the input field
      );
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.plumberName}>{plumberName}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.quotation}>{"$" + quotation + " per hour"}</Text>
          <Button text="edit offer" onPress={() => handleEditOffer()} />
          <Button text="Complete" onPress={() => handleCompletePress()} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6A1B9A",
    padding: 16,
    paddingTop: StatusBar.currentHeight + 50,
    marginBottom: 16,
  },
  plumberName: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quotation: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
    marginRight: 8,
  },
});

export default Quotation;
