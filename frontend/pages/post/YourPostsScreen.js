// landing page
import { FlatList, View, Text } from "react-native";
import Button from "../../components/Button";
import { useEffect, useState } from "react";

const YourPostsPage = ({ navigation }) => {
    const [issues, setIssues] = useState([]);

    const getIssues = () => {
        return fetch("https://localhost:3000/api/issue")
            .then((response) => response.json())
            .then((json) => {
                setIssues(json.issue);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getIssues();
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
