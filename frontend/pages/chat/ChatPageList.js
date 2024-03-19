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

            console.log("user:", userEmail);
            console.log("sender:", senderEmail);
            console.log("Recipient:", recipient);
            console.log(uniqueRecipients);

            // Check if the message is sent by the user or is sent to the user
            if (
              (senderEmail === userEmail || recipient === userEmail) &&
              !uniqueRecipients.has(recipient) &&
              !uniqueRecipients.has(senderEmail)
            ) {
              //if recipient is the new user
              if (recipient === userEmail) {
                uniqueRecipients.add(senderEmail);
                return {
                  _id: doc.id,
                  recipient: senderEmail,
                  user: {
                    _id: userEmail, // Set user to the actual sender ID
                  },
                  message: data.text,
                };
              } else if (senderEmail === userEmail) {
                uniqueRecipients.add(recipient);
                return {
                  _id: doc.id,
                  recipient: data.recipient,
                  user: {
                    _id: userEmail, // Set user to the actual sender ID
                  },
                  message: data.text,
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

  const handleUserPress = (recipientEmail) => {
    navigation.navigate("ChatPage", { otherEmail: recipientEmail });
  };

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item.recipient)}>
      <View style={styles.item}>
        <Text style={styles.username}>{item.recipient}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <Logo text="My Chats"/>
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
