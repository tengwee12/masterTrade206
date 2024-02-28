// Message.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ message, isSent }) => {
  return (
    <View style={[styles.container, isSent ? styles.sent : styles.received]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%', // Adjust as needed
    alignSelf: 'flex-start', // Align to the left
  },
  sent: {
    alignSelf: 'flex-end', // Align to the right
    backgroundColor: '#6A1B9A', // Purple color
  },
  received: {
    backgroundColor: '#EDE7F6', // Light purple color
  },
  messageText: {
    color: '#000000', // Black color
  },
});

export default Message;
