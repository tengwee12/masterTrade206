import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostScreen from "./pages/post/PostPage";
import ChatScreen from "./pages/chat/ChatPage";
import ReviewScreen from "./pages/review/ReviewPage";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Review" component={ReviewScreen} />
                <Tab.Screen name="Post" component={PostScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
