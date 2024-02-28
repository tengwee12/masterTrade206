import React from 'react';
import { View, StyleSheet } from 'react-native';
import Message from './Message';
import Quotation from './Quotation'; // Import the Quotation component

const ChatPage = () => {
  return (
    <View style={styles.container}>
      <Quotation plumberName="John Doe" quotation="$50 per hour" />
      <Message
        message="Hello. How are you today?"
        time="11:00"
        isSent={false}
      />    
      <Message
        message="Hey! I'm fine. Thanks for asking!"
        time="11:01"
        isSent={true}
      />
      <Message
        message="Sweet! So, what do you wanna do today?"
        time="11:02"
        isSent={false}
      />
      <Message
        message="Nah, I dunno. Play soccer.. or learn more coding perhaps?"
        time="11:05"
        isSent={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ChatPage;
