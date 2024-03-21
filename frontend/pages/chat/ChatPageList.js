import React, {
  useState,
  useLayoutEffect,
} from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../services/firebase";
import { getItem } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { fetchIssueData } from "../../services/issue";

const ChatPageList = () => {
  const [chats, setChats] = useState([]);
  const userEmail = getItem("email");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const loadChats = async () => {
      const collectionRef = collection(database, "chats");
      const q = query(collectionRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const uniqueRecipients = new Set();
        const updatedChats = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            const senderEmail = data.user;
            const recipient = data.recipient; // Assuming recipient field is added to each message
            const issueId = data.issueId;

            // console.log("user:", userEmail);
            // console.log("sender:", senderEmail);
            // console.log("Recipient:", recipient);
            // console.log(uniqueRecipients);

            // Check if the message is sent by the user or is sent to the user
            if ((senderEmail === userEmail || recipient === userEmail) && !uniqueRecipients.has(`${recipient}-${issueId}`) && !uniqueRecipients.has(`${senderEmail}-${issueId}`)
            ) {
              //if recipient is the new user
              if (recipient === userEmail) {
                uniqueRecipients.add(`${senderEmail}-${issueId}`);
                return {
                  _id: doc.id,
                  recipient: senderEmail,
                  user: {
                    _id: userEmail, // Set user to the actual sender ID
                  },
                  message: data.text,
                  issueId: issueId
                };
              } else if (senderEmail === userEmail) {
                uniqueRecipients.add(`${recipient}-${issueId}`);
                return {
                  _id: doc.id,
                  recipient: data.recipient,
                  user: {
                    _id: userEmail, // Set user to the actual sender ID
                  },
                  message: data.text,
                  issueId: issueId
                };
              }
            } else {
              return null; // Exclude messages not sent by or to the user
            }
          })
          .filter((message) => message !== null); // Filter out null values

        console.log("Updated Chats:", updatedChats);
        setChats(updatedChats);
      });
      return () => unsubscribe();
    };

    loadChats();
  }, []);

  const handleUserPress = (recipientEmail, issueId) => {
    navigation.navigate("ChatPage", { otherEmail: recipientEmail, issue: issueId });
  };

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item.recipient, item.issueId)}>
      <View style={styles.item}>
        <Text style={styles.username}>{item.recipient}</Text>
        <Text style={styles.username}>{item.issueId}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <Logo text="对话"/>
      {chats.length === 0 && <Text className="text-center mt-10">No chats yet!</Text>}
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ChatPageList;
