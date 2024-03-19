// step 3 of 5
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Keyboard } from "react-native";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo";
import PurpleButton from "../../components/PurpleButton";

const DescribeIssuePage = ({ navigation, route }) => {
  const { issue } = route.params;

  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (title && description) {
      setError("");
      const updatedIssue = {
        ...issue,
        title: title,
        description: description,
      };
      /* Alert.alert(
        `Submitted form with title: ${title}\n description: ${description}`
      ); */
      console.log("After adding title and description: \n", updatedIssue);
      navigation.navigate("InputAvailabilityScreen", { issue: updatedIssue });
    }

    setError("Please fill in both title and description!");
  };

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <BackButton color="white" />
      <Logo text="Create New Post" />
      <View className="p-4">
        <Text className="pb-2 pt-2">Step 3 of 5</Text>
        <Text className="font-bold text-lg mb-2">Describe the issue in detail</Text>
        {error && <Text className="text-red-600 mb-2">{error}</Text>}
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

            <Text className="pt-2">
              Include clear details so that your contractor understands the
              problem.
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <PurpleButton text="Next" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default DescribeIssuePage;
