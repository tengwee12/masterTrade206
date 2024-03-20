import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { getItem } from 'expo-secure-store';

import Quotation from './Quotation';
import Message from './Message'; // Import the Message component

  const ChatPage = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const userEmail = getItem('email');
    const { otherEmail, issue } = route.params;
    // console.log(issue)
    // console.log(otherEmail)

    useLayoutEffect(() => {
      const loadMessages = async () => {
        const { otherEmail } = await route.params      // Example recipient ID, replace with actual recipient ID
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, snapshot => {
          const updatedMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            const senderEmail = data.user;
            const recipient = data.recipient; // Assuming recipient field is added to each message
            const issueId = data.issueId.toString();
            
            // Check if the message is sent by the user or is sent to the user
            if (((senderEmail === userEmail && recipient === otherEmail) || (senderEmail === otherEmail && recipient === userEmail)) && (issue == issueId)) {
              return {
                _id: doc.id,
                createdAt: data.createdAt,
                text: data.text,
                user: {
                  _id: senderEmail, // Set user to the actual sender ID
                },
                recipient : data.recipient,
                issueId: issue,
              };
            } else {
              return null; // Exclude messages not sent by or to the user
            }
          }).filter(message => message !== null); // Filter out null values
          
          setMessages(updatedMessages);
        });
        
        return () => unsubscribe();
      };
    
      loadMessages();
    }, []);
  

    const onSend = useCallback(async (newMessages = []) => {
      const newMessage = newMessages[0];
      const { otherEmail, issue } = await route.params      // Example recipient ID, replace with actual recipient ID
      const messageToSend = {
        _id: newMessage._id,
        createdAt: newMessage.createdAt,
        text: newMessage.text,
        user: userEmail,
        recipient: otherEmail, // Include recipient information
        issueId: issue.toString(),
      };
      addDoc(collection(database, 'chats'), messageToSend);
    }, []);

  return (
    <View style={styles.container}>
      <Quotation otherEmail={otherEmail} quotation={"no input"} issue={issue === null ? "no input" : issue.toString()}/>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: userEmail }} // Set user to userEmail
        renderMessage={(props) => (
          <Message
            message={props.currentMessage.text}
            time={props.currentMessage.createdAt}
            isSent={props.currentMessage.user._id === props.user._id} // Compare with user._id
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatPage;
