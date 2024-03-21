import React, { useState } from "react";
import { Alert } from "react-native";
import { collection, getDocs, query, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from "../../../services/firebase";
import { getItem } from "expo-secure-store";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const UpdateDate = ({ issue, otherEmail, setDate }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const userEmail = getItem("email");
  const quotationRef = collection(database, "quotations");
  const q = query(
    quotationRef,
    where("userEmail", "==", userEmail),
    where("plumberName", "==", otherEmail),
    where("issue", "==", issue)
  );

  const handleConfirm = async (date) => {
    try {
      if (date) {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            userEmail: userEmail,
            plumberName: otherEmail,
            date: date,
            issue: issue,
            updatedAt: serverTimestamp(),
          });
        });

        setDate(date);

        Alert.alert(
          "Date Updated",
          "The date of the quotation has been successfully updated."
        );
      }
      setDatePickerVisible(false);
    } catch (error) {
      console.error("Error updating date:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default UpdateDate;
