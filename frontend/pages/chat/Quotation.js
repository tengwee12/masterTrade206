import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Alert, StatusBar, StyleSheet } from "react-native";
import BackButton from "../../components/BackButton";
import { collection, addDoc, getDocs, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { getItem } from "expo-secure-store";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import UpdateQuotation from "./functions/UpdateQuotation";
import AcceptQuotation from "./functions/AcceptQuotation";
import AcceptDate from "./functions/AcceptDate";

const Quotation = ({ otherEmail, quotation, issue }) => {
  const userEmail = getItem("email");
  [quotation, setQuotation] = useState(quotation);
  [issue, setIssue] = useState(issue);
  [date, setDate] = useState("no date");
  const [status, setStatus] = useState(5); // Initializing status to 5 as an integer

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
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
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setQuotation(data.quotation);
          setDate(data.date);
          setStatus(data.status);
        } else {
          if (isPlumber === "true") {
            Alert.prompt(
              "Initial Quotation",
              "Enter your initial quote ($)",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Save",
                  onPress: async (initialValue) => {
                    const intValue = parseInt(initialValue);
                    if (!isNaN(intValue)) {
                      await addDoc(quotationRef, {
                        userEmail: otherUser,
                        plumberName: currentUser,
                        quotation: `${initialValue}`,
                        issue: issue,
                        status: 2, // Initializing status to 5 as an integer
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                      });
                      setQuotation(initialValue);
                    } else {
                      Alert.alert(
                        "Invalid Input!",
                        "Please enter a valid integer value."
                      );
                    }
                  },
                },
              ],
              "plain-text",
              "50"
            );
          } else {
            setQuotation("50");
          }
          setStatus(2);
        }
      } catch (error) {
        console.error("Error fetching quotation:", error);
      }
    };

    fetchQuotation();
  }, []);

  const handleUpdateDisplay = (newValue) => {
    setQuotation(newValue);
  };

  const handleEditOffer = async () => {
    try {
      const newValue = await UpdateQuotation(quotation, issue, otherEmail, handleUpdateDisplay);
      setQuotation(newValue);
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };

  const handleConfirmDate = async (selectedDate) => {
    try {
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const formattedDateTime = `${formattedDate} ${formattedTime}:00`;
        console.log(formattedDateTime);
        const userEmail = getItem("email");
        const quotationRef = collection(database, "quotations");
        const q = query(
          quotationRef,
          where("userEmail", "==", userEmail),
          where("plumberName", "==", otherEmail),
          where("issue", "==", issue)
        );
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            userEmail: userEmail,
            plumberName: otherEmail,
            date: formattedDateTime,
            issue: issue,
            updatedAt: serverTimestamp()
          });
        });
        setDate(formattedDateTime);
      }
      setDatePickerVisible(false);
    } catch (error) {
      console.error("Error updating date:", error);
    }
  };
  
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  
  return (
    <>
      <View style={styles.container}>
        <BackButton color="white" />
        <Text className="text-lg font-bold text-white text-center">{otherEmail}</Text>
        <View className="flex flex-row items-center justify-between mt-4 w-full">
  
          <View className="flex flex-col">
            <Text style={styles.quotation}>Quotation: ${quotation}</Text>
            <Text style={styles.quotation}>Date: {date}</Text>
          </View>

          <View>
            {status === 0 && (
              <Pressable
                className="bg-gray-300 p-3 rounded flex flex-end"
                disabled={true}
              >
                <Text style={styles.buttonText}>Done</Text>
              </Pressable>
            )}

            {getItem("isPlumber") === "true" && status === 2 && (
              <Pressable
                className="bg-white p-3 rounded flex flex-end"
                onPress={() => handleEditOffer()}
              >
                <Text>Edit Offer</Text>
              </Pressable>
            )}
    
            {getItem("isPlumber") === "true" && status === 1 && (
              <Pressable
                className="bg-green-500 text-white p-3 rounded"
                onPress={() => AcceptDate(otherEmail, userEmail, issue, date, status, setStatus)}
              >
                <Text>Accept Date</Text>
              </Pressable>
            )}
    
            {getItem("isPlumber") === "false" && status === 2 && (
              <Pressable
                className="bg-green-500 text-white p-3 rounded"
                onPress={() => AcceptQuotation(otherEmail, userEmail, issue, quotation, status, setStatus)}
              >
                <Text>Accept Quotation</Text>
              </Pressable>
            )}
    
            {getItem("isPlumber") === "false" && status === 1 && (
              <Pressable
                className="bg-white p-3 rounded flex flex-end"
                onPress={() => showDatePicker()}
              >
                <Text>Edit Date</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
        textColor="#333"
        is24Hour={true} // Set to true to enable 24-hour format
      />
    </>
  );  
};
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#440d88",
      padding: 16,
      paddingTop: StatusBar.currentHeight + 50,
      marginBottom: 16,
    },
    otherEmail: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quotation: {
      fontSize: 16,
      color: "#FFFFFF",
      flex: 1,
      marginRight: 8,
    },
    button: {
      backgroundColor: "#5cb85c",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      alignItems: "center",
    },
  });
  
  export default Quotation;  