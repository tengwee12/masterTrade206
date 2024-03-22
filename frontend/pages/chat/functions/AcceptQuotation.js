import { Alert } from "react-native";
import { collection, addDoc, getDocs, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../../../services/firebase';
import { getItem } from "expo-secure-store";

const AcceptQuotation = async (otherEmail, userEmail, issue, quotationValue, status, setStatus) => {
  try {
    // Display the current quotation
    Alert.alert("Current Quotation", `Quotation: $${quotationValue}`);

    // Reduce the status of the quotation by 1
    const newStatus = status - 1;
    setStatus(newStatus);

    // Update the status in the database
    const quotationRef = collection(database, "quotations");
    const q = query(
      quotationRef,
      where("userEmail", "==", userEmail),
      where("plumberName", "==", otherEmail),
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

export default AcceptQuotation;
