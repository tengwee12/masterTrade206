import { Alert } from "react-native";
import { collection, addDoc, getDocs, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../../../services/firebase';
import { getItem } from "expo-secure-store";

const AcceptDate = async (otherEmail, userEmail, issue, date, status, setStatus) => {
  try {
    // Display the current quotation
    Alert.alert("Current Date", `Date: ${date}`);

    // Reduce the status of the quotation by 1
    const newStatus = status - 1;
    setStatus(newStatus);

    // Update the status in the database
    const quotationRef = collection(database, "quotations");
    const q = query(
      quotationRef,
      where("userEmail", "==", otherEmail),
      where("plumberName", "==", userEmail),
      where("issue", "==", issue)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { status: newStatus, updatedAt: serverTimestamp() });
      });
    }

  } catch (error) {
    console.error("Error accepting quotation:", error);
  }
};

export default AcceptDate;
