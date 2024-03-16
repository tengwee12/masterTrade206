import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { getItem } from 'expo-secure-store';

import Quotation from './Quotation';
import Message from './Message'; // Import the Message component

  const ChatPage = () => {
    const { recipientId } = route.params      // Example recipient ID, replace with actual recipient ID
    const [messages, setMessages] = useState([]);
    const userId = getItem('userId');

    useLayoutEffect(() => {
      const loadMessages = async () => {
        const userId = await getItem('userId');
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, snapshot => {
          const updatedMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            const senderId = data.user;
            const recipientId = data.recipient; // Assuming recipient field is added to each message
            
            // Check if the message is sent by the user or is sent to the user
            if (senderId === userId || recipientId === userId) {
              return {
                _id: doc.id,
                createdAt: data.createdAt,
                text: data.text,
                user: {
                  _id: senderId, // Set user to the actual sender ID
                },
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
      const messageToSend = {
        _id: newMessage._id,
        createdAt: newMessage.createdAt,
        text: newMessage.text,
        user: userId,
        recipient: recipientId // Include recipient information
      };
      addDoc(collection(database, 'chats'), messageToSend);
    }, []);

  return (
    <View style={styles.container}>
      <Quotation plumberName="John Doe" quotation="$50 per hour" />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: userId }} // Set user to userId
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
    padding: 8,
  },
});

export default ChatPage;
