import { View, Text, FlatList, Pressable } from "react-native";
import BackButton from "../../components/BackButton";

export default function App({ navigation }) {
  const categories = ["Pipes", "Ceiling Leak", "Toilet Bowl", "Water Tap", "Water Heater"];

  const createIssueWithCategory = (category) => {
    console.log("Selected category:", category);
    const issue = {
      description: "",
      title: "",
      media: "",
      category: category, // Set the selected category
      address: "",
      startDate: "",
      endDate: "",
    };
    console.log(issue);
    navigation.navigate("MediaUploadScreen", { issue: issue });
  };
  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <BackButton color="white" />
      <Logo text="Create New Post" />
      <View className="p-4">
        <Text className="pb-2 pt-2">Step 1 of 5</Text>
        <Text className="font-bold text-lg pb-2">
          What service are you looking for?
        </Text>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Pressable
              className="bg-white rounded-lg shadow-md my-2 p-4"
              onPress={() => createIssueWithCategory(item)}
            >
              <Text>{item}</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}
