// Quotation.js
import React from 'react';
import Button from "../../components/Button";
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
        <Button text="Complete" onPress={() => handleCompletePress()} />
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
