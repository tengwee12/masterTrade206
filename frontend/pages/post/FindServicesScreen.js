import { View, Text } from "react-native";
import Button from "../../components/Button";

export default function App({ navigation }) {
    const categories = ["Pipes", "Ceiling Leak", "Toilet Bowl"];

    const createIssueWithCategory = (category) => {
        navigation.navigate("MediaUploadScreen", {
            description: "",
            title: "",
            media: "",
            category: category, // Set the selected category
            address: "",
            startDate: "",
            endDate: "",
        });
    };
    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 1 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                What service are you looking for?
            </Text>
            {categories.map((category, index) => (
                <Button
                    key={index}
                    text={category}
                    onPress={() => createIssueWithCategory(category)}
                />
            ))}
        </View>
    );
}
