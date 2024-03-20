import { createStackNavigator } from "@react-navigation/stack";
import PlumberSchedulePage from "../pages/plumber/PlumberSchedulePage";
import PlumberJobDetailsPage from "../pages/plumber/PlumberJobDetailsPage";
import ChatPage from '../pages/chat/ChatPage';

const Stack = createStackNavigator();

export default function PlumberScheduleStack() {
  return (
    <Stack.Navigator
      initialRouteName="PlumberSchedulePage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PlumberSchedulePage" component={PlumberSchedulePage} />
      <Stack.Screen name="PlumberJobDetailsPage" component={PlumberJobDetailsPage} />
      <Stack.Screen name="ChatPage" component={ChatPage} />
    </Stack.Navigator>
  );
}
