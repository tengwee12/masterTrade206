import { createStackNavigator } from "@react-navigation/stack";
import PlumberPage from "../pages/PlumberPage";
import ReviewPage from "../pages/review/ReviewPage";
import HomePage from "../pages/HomePage";
import FilterPage from "../pages/FilterPage";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Filter" component={FilterPage} />
      <Stack.Screen name="Plumber" component={PlumberPage} />
      <Stack.Screen name="Review" component={ReviewPage} />
    </Stack.Navigator>
  );
}
