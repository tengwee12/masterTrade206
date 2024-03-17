// Quotation.js
import React, { useState } from 'react';
import Button from "../../components/Button";
import { View, Text, StyleSheet, Pressable, Alert, StatusBar } from 'react-native';

const Quotation = ({ plumberName, quotation }) => {
  [quotation, setQuotation] = useState(quotation);

//TODO : Complete the transaction and confirm date and time
  const handleCompletePress = () => {
    Alert.alert('Job Completed', 'Congratulations! The job has been completed.');
  };

//TODO : be able to edit the offer
  const handleEditOffer = () => {
    Alert.prompt(
      'Edit Quotation',
      'Enter your new quote ($)',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: (newValue) => {
            // Handle the value entered by the user
            const intValue = parseInt(newValue);
            if (!isNaN(intValue)) {
              setQuotation("$" + newValue + " per hour")
//TODO : send the new offer to the backend and prompt the otherside to update :)

            } else {
              // Input is not a valid integer
              alert('Invalid Input! Please enter an integer value.');
            } 
          },
        },
      ],
      'plain-text', // Specify the input type
      "50", // Initial value for the input field
    );
  }

  return (

  <>
    <View style={styles.container}>
      <Text style={styles.plumberName}>{plumberName}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.quotation}>{quotation}</Text>
        <Button text="edit offer" onPress={() => handleEditOffer()} />
        <Button text="Complete" onPress={() => handleCompletePress()} />
      </View>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6A1B9A',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 50,
    marginBottom: 16,
  },
  plumberName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quotation: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
});

export default Quotation;
