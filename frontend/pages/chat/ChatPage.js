import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';

import Quotation from './Quotation';
import Message from './Message'; // Import the Message component


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      console.log("heloo snapping shots")
      setMessages(
        snapshot.docs.map(doc => ({
          _id : doc.id,
          createdAt : doc.data().createdAt,
          text : doc.data().text,
          user : doc.data().user
        }))
      )
    });
    return () => unsubscribe()
  }, []);

  //TODO : send this to backend
  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const {_id, createdAt, text, user} = messages[0];
    addDoc(collection(database, 'chats'), {_id, createdAt, text, user});
  }, []);

  return (
    <View style={styles.container}>
      <Quotation plumberName="John Doe" quotation="$50 per hour" />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ 
          _id: 1 ,                                        //Need to add userID but i cnnt cus cnnt login
          avatar: 'https://i.pravatar.cc/300'}}
        renderMessage={(props) => (
          <Message
            message={props.currentMessage.text}
            time={props.currentMessage.createdAt} // Format the time properly
            isSent={props.currentMessage.user._id === 1} // Assuming user 1 is the current user
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

