// landing page
import { View, Text } from "react-native";
import Button from "../../components/Button";

const YourPostsPage = ({navigation}) => {
    return <View>
        <Text>
            This is the main page of the post function. {"\n"}
            A user will be able to see posts that they have created. {"\n"}
            The user can also click the button to create a new post.
        </Text>
        <Button text="New post" onPress={() => navigation.navigate("FindServicesPage")} />
    </View>;
};

export default YourPostsPage;
