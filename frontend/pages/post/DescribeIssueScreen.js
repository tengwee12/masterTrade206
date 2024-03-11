// step 3 of 5
import { Alert, View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import Button from "../../components/Button";
import { useState } from "react";
import { Keyboard } from "react-native";

const DescribeIssuePage = ({ navigation }) => {
    const [title, onChangeTitle] = useState("")
    const [description, onChangeDescription] = useState("")

    const handleSubmit = () => {
        Alert.alert(`Submitted form with title: ${title}\n description: ${description}`)
        onChangeTitle("")
        onChangeDescription("")
        navigation.navigate('InputAvailabilityScreen')
    }

    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 3 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                Describe the issue in detail
            </Text>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <Text className="pb-2 pt-4">Title</Text>
                    <TextInput 
                        value={title}
                        placeholder="Enter title here"
                        onChangeText={onChangeTitle}
                        className="p-4 bg-inputGray rounded-md"
                    />

                    <Text className="pb-2 pt-6">Description</Text>
                    <TextInput
                        value={description}
                        placeholder="Enter description here"
                        onChangeText={onChangeDescription}
                        multiline={true}
                        className="p-4 bg-inputGray rounded-md h-2/5"
                    />

                    <Text className="pt-2">Include clear details so that your contractor understands the problem.</Text>
                </View>
            </TouchableWithoutFeedback>

            <Button 
                text="Submit"
                onPress={handleSubmit}
            />
        </View>
    );
};

export default DescribeIssuePage;
