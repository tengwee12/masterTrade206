import { createStackNavigator } from '@react-navigation/stack';
import ChatPage from '../pages/chat/ChatPage';
import ChatPageList from '../pages/chat/ChatPageList';


const Stack = createStackNavigator();


export default function ChatStack() {
    return (
        <Stack.Navigator initialRouteName="ChatPageList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ChatPageList" component={ChatPageList} />
            <Stack.Screen name="ChatPage" component={ChatPage} />
        </Stack.Navigator>
    );
}
