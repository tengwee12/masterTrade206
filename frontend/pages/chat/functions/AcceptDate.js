import { Alert } from "react-native";
import { collection, getDocs, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../../../services/firebase';
import { axiosInstance } from "../../../services/axios";
import { getItem } from "expo-secure-store";

const AcceptDate = async (otherEmail, userEmail, issue, date, status, setStatus, pid) => {
  try {
    // Display the current quotation
    Alert.alert("Current Date", `Date: ${date}`);

    // Convert the date string to a Date object
    const formattedDate = new Date(date.split(" ")[0] + "T" + date.split(" ")[1]);

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
            
            console.log(pid);
            const payload = {
                dateTime: formattedDate, // Use formatted date here
                quotation: doc.data().quotation,
                PlumberId: pid,
                IssueId: doc.data().issue,
            };
            console.log(payload)
            // Send the quotation information to the backend
            try {
                const response = await axiosInstance.post("/api/transaction", payload);
                console.log(response.data);
            } catch (error) {
                console.error(error.message);
            }

            // Update status and updatedAt in Firestore
            await updateDoc(doc.ref, { status: newStatus, updatedAt: serverTimestamp() });
        });
    }

  } catch (error) {
    console.error("Error accepting quotation:", error);
  }
};

export default AcceptDate;
