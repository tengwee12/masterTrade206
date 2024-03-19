// Quotation.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  StatusBar,
} from "react-native";
import BackButton from "../../components/BackButton";

const Quotation = ({ plumberName, quotation }) => {
  [quotation, setQuotation] = useState(quotation);

  //TODO : Complete the transaction and confirm date and time
  const handleCompletePress = () => {
    Alert.alert(
      "Job Completed",
      "Congratulations! The job has been completed."
    );
  };

  //TODO : be able to edit the offer
  const handleEditOffer = () => {
    Alert.prompt(
      "Edit Quotation",
      "Enter your new quote ($)",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: (newValue) => {
            // Handle the value entered by the user
            const intValue = parseInt(newValue);
            if (!isNaN(intValue)) {
              setQuotation("$" + newValue);
              //TODO : send the new offer to the backend and prompt the otherside to update :)
            } else {
              // Input is not a valid integer
              alert("Invalid Input! Please enter an integer value.");
            }
          },
        },
      ],
      "plain-text", // Specify the input type
    );
  };

  return (
    <>
      <View style={styles.container}>
        <BackButton color="white" />
        <Text className="text-lg font-bold text-white text-center">{plumberName}</Text>
        <View className="flex flex-row items-center mt-4">
          <Text style={styles.quotation}>Quotation: {quotation}</Text>
          <Pressable
            className="bg-white p-3 rounded mr-5"
            onPress={() => handleEditOffer()}
          >
            <Text>Edit Offer</Text>
          </Pressable>
          <Pressable
            className="bg-white p-3 rounded"
            onPress={() => handleCompletePress()}
          >
            <Text>Complete</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#440d88",
    padding: 16,
    paddingTop: StatusBar.currentHeight + 50,
    marginBottom: 16,
  },
  quotation: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
    marginRight: 8,
  },
});

export default Quotation;
