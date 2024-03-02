// step 3 of 5
import { View, Text, SafeAreaView, TextInput } from "react-native";
import Button from "../../components/Button";
import { useState } from "react";

const DescribeIssuePage = ({ navigation }) => {
    const [text, onChangeText] = useState("");
    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 3 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                Describe the issue in detail
            </Text>

            <Text className="pb-2 pt-2">Description</Text>
            <TextInput
                value={text}
                placeholder="Enter description here"
                onChangeText={onChangeText}
                className="p-4 bg-inputGray rounded-md"
            />

            <Button
                text="Go to Input Availability Page"
                onPress={() => navigation.navigate("InputAvailabilityPage")}
            />
        </View>
    );
};

export default DescribeIssuePage;
