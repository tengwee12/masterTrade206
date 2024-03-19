// step 4 of 5
import { View, Text, Alert, FlatList, Pressable } from "react-native";
import Button from "../../components/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import PurpleButton from "../../components/PurpleButton";

// TODO: the available slots are not displaying

const InputAvailabilityPage = ({ navigation, route }) => {
  const { issue } = route.params;
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [endTime, setEndTime] = useState("");
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [error, setError] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate.toISOString().split("T")[0]);
    setDatePickerVisibility(false);
  };

  const handleConfirmStartTime = (selectedTime) => {
    setStartTime(
      selectedTime.toTimeString().split(":")[0] +
        ":" +
        selectedTime.toTimeString().split(":")[1]
    );
    setStartTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (selectedTime) => {
    setEndTime(
      selectedTime.toTimeString().split(":")[0] +
        ":" +
        selectedTime.toTimeString().split(":")[1]
    );
    setEndTimePickerVisibility(false);
  };

  const handleSubmit = () => {
    if (date && startTime && endTime) {
      setError("");
      const startDateTime = `${date}T${startTime}:00`;
      const endDateTime = `${date}T${endTime}:00`;
      const updatedIssue = {
        ...issue,
        startDate: startDateTime,
        endDate: endDateTime,
      };
      /* Alert.alert(`Start: ${startDateTime}, End: ${endDateTime}`); */
      console.log(updatedIssue);
      navigation.navigate("SelectLocationScreen", { issue: updatedIssue });
    }

    setError("Please fill in all the fields!");
  };

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <BackButton color="white" />
      <Logo text="Create New Post" />
      <View className="p-4">
        <Text className="pb-2 pt-2">Step 4 of 5</Text>
        <Text className="font-bold text-lg mb-2">When are you available?</Text>
        {error.length > 0 && <Text className="text-red-600 mb-2">{error}</Text>}
        <View>
          <Pressable
            className="bg-white rounded-lg shadow-md my-2 p-4"
            onPress={showDatePicker}
          >
            <Text>{date ? `Selected Date: ${date}` : "Select Date"}</Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisibility(false)}
            textColor="#333"
          />

          <Pressable
            className="bg-white rounded-lg shadow-md my-2 p-4"
            onPress={showStartTimePicker}
          >
            <Text>
              {startTime ? `Start: ${startTime}` : "Select Start Time"}
            </Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmStartTime}
            onCancel={() => setStartTimePickerVisibility(false)}
            textColor="#333"
          />

          <Pressable
            className="bg-white rounded-lg shadow-md my-2 p-4"
            onPress={showEndTimePicker}
          >
            <Text>{endTime ? `End Time: ${endTime}` : "Select End Time"}</Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmEndTime}
            onCancel={() => setEndTimePickerVisibility(false)}
            textColor="#333"
          />
        </View>

        <PurpleButton text="Next" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default InputAvailabilityPage;
