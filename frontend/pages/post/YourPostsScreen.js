// landing page
import { FlatList, View, Text } from "react-native";
import Button from "../../components/Button";
import { useCallback, useState } from "react";
import { axiosInstance } from "../../services/axios";
import { getItemAsync } from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

const YourPostsPage = ({ navigation }) => {
    const [issues, setIssues] = useState([]);

    const getIssues = async () => {
        try {
            const result = await axiosInstance.get("/api/issue");
            console.log("i got issues\n", result.data);
            setIssues(result.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getIssues();
        }, [])
    );

    // FlatList is here to test things only
    // TODO: create an actual styled list that looks decent
    return (
        <View>
            <FlatList
                data={issues}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <Text className="m-4">
                        Title: {item.title +  "\n"}
                        Category: {item.category +  "\n"}
                        Description: {item.description +  "\n"}
                        startDate: {item.startDate +  "\n"}
                        Address: {item.address}
                    </Text>
                )}
            />
            <Button
                text="New post"
                onPress={() => navigation.navigate("FindServicesScreen")}
            />
        </View>
    );
};

export default YourPostsPage;
