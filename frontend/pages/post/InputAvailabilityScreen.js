// step 4 of 5
import { View, Text, ScrollView, Alert, FlatList } from "react-native";
import Button from "../../components/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";

// TODO: the available slots are not displaying

const InputAvailabilityPage = ({ navigation, route }) => {
    const {issue} = route.params;
    console.log(issue)
    const [date, setDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [isStartTimePickerVisible, setStartTimePickerVisibility] =
        useState(false);
    const [endTime, setEndTime] = useState("");
    const [isEndTimePickerVisible, setEndTimePickerVisibility] =
        useState(false);
    const [availableSlots, setAvailableSlots] = useState([]);

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
            const startDateTime = `${date}T${startTime}:00`;
            const endDateTime = `${date}T${endTime}:00`;
            issue = {
                ...issue,
                startDate: startDateTime,
                endDate: endDateTime,
            };
            Alert.alert(`Start: ${startDateTime}, End: ${endDateTime}`);
            console.log(issue)
            navigation.navigate("SelectLocationScreen", {issue})
        }
    };

    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 4 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                When are you available?
            </Text>

            <View>
                <View className="flex-row justify-between items-center">
                    <View className="w-2/5">
                        <Button text="Select Date" onPress={showDatePicker} />
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                        textColor="#333"
                    />
                    <Text className="w-2/5">{date}</Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="w-2/5">
                        <Button text="From:" onPress={showStartTimePicker} />
                    </View>
                    <DateTimePickerModal
                        isVisible={isStartTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmStartTime}
                        onCancel={() => setStartTimePickerVisibility(false)}
                        textColor="#333"
                    />
                    <Text className="w-2/5">{startTime}</Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="w-2/5">
                        <Button text="To:" onPress={showEndTimePicker} />
                    </View>
                    <DateTimePickerModal
                        isVisible={isEndTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmEndTime}
                        onCancel={() => setEndTimePickerVisibility(false)}
                        textColor="#333"
                    />
                    <Text className="w-2/5">{endTime}</Text>
                </View>
            </View>

            <Button text="Submit" onPress={handleSubmit} />

            <FlatList>
                {availableSlots.map((slot, index) => {
                    <View key={index} className="mt-2 p-2 bg-slate-400">
                        <Text>
                            {slot.date}: {slot.startTime} - {slot.endTime}
                        </Text>
                        <Text>hello</Text>
                    </View>;
                })}
            </FlatList>

            <Button
                text="Go to Select Location Screen"
                onPress={() => navigation.navigate("SelectLocationScreen")}
            />
        </View>
    );
};

export default InputAvailabilityPage;
