// landing page
import { FlatList, View, Text } from "react-native";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/axios";
import { getItemAsync } from "expo-secure-store";

const YourPostsPage = ({ navigation }) => {
    const [issues, setIssues] = useState([]);

    const getIssues = async () => {
        try {
            const result = await axiosInstance.get("/api/issue")
            console.log("i got issues\n", result.data)
            setIssues(result.data)
        } catch (error) {
            console.error(error.message);
        }
    };

    const getUserId = async () => {
        try {
            const response = await getItemAsync("userId");
            console.log(response);
            return response;
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getIssues()
        getUserId();
    }, []);

    // FlatList is here to test things only
    return (
        <View>
            <FlatList
                data={issues}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <Text>
                        {item.issueID}, {item.description}
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
