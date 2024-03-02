// step 5 of 5
import { Alert, Text, View } from "react-native";
import Button from "../../components/Button";

const SelectLocationPage = ({ navigation }) => {
    const handlePress = () => {
        Alert.alert("Post created!", "", [
            {
                text: "OK",
                onPress: () => navigation.navigate("YourPostsScreen"),
            },
        ]);
    };

    return (
        <View>
            <Text>User will select their location here</Text>
            <Button text="Go back to home page" onPress={handlePress} />
        </View>
    );
};

export default SelectLocationPage;
