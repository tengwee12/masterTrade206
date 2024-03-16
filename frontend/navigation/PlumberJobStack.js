import { createStackNavigator } from "@react-navigation/stack";
import PlumberPostsPage from "../pages/post/PlumberPostsPage";
import PlumberJobDetailsPage from "../pages/post/PlumberJobDetailsPage";

const Stack = createStackNavigator();

export default function PlumberJobStack() {
  return (
    <Stack.Navigator
      initialRouteName="PlumberPostsPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PlumberPostsPage" component={PlumberPostsPage} />
      <Stack.Screen name="PlumberJobDetailsPage" component={PlumberJobDetailsPage} />
    </Stack.Navigator>
  );
}
