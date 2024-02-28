// Quotation.js
import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

const Quotation = ({ plumberName, quotation }) => {
  const handleCompletePress = () => {
    Alert.alert('Job Completed', 'Congratulations! The job has been completed.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.plumberName}>{plumberName}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.quotation}>{quotation}</Text>
        <Pressable
          style={styles.button}
          onPress={handleCompletePress}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6A1B9A',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  plumberName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quotation: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#DDDDDD', // Gray color for button
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000', // Black color for button text
  },
});

export default Quotation;
