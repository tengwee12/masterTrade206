import { createStackNavigator } from "@react-navigation/stack";
import PlumberPage from "../pages/PlumberPage";
import ReviewPage from "../pages/review/ReviewPage";
import HomePage from "../pages/HomePage";
import FilterPage from "../pages/FilterPage";
import ChatPage from '../pages/chat/ChatPage';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Filter" component={FilterPage} />
      <Stack.Screen name="Plumber" component={PlumberPage} />
      <Stack.Screen name="Review" component={ReviewPage} />
      <Stack.Screen name="ChatPage" component={ChatPage} />
    </Stack.Navigator>
  );
}
