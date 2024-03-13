import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { getItem } from 'expo-secure-store';

import Quotation from './Quotation';
import Message from './Message'; // Import the Message component

  const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const userId = getItem('userId');

    useLayoutEffect(() => {
      const loadMessages = async () => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
    
        const unsubscribe = onSnapshot(q, snapshot => {
          const updatedMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              _id: doc.id,
              createdAt: data.createdAt,
              text: data.text,
              user: {
                _id: data.user, // Set user to the actual user ID from Firestore
              },
            };
          });
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
      user: userId // set the user to userId
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
