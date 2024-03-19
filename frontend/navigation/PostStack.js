import { createStackNavigator } from "@react-navigation/stack";
import FindServicesScreen from "../pages/post/FindServicesScreen";
import MediaUploadScreen from "../pages/post/MediaUploadScreen";
import DescribeIssueScreen from "../pages/post/DescribeIssueScreen";
import InputAvailabilityScreen from "../pages/post/InputAvailabilityScreen";
import SelectLocationScreen from "../pages/post/SelectLocationScreen";
import YourPostsScreen from "../pages/post/YourPostsScreen";
import IssueDetailsScreen from "../pages/post/IssueDetailsScreen";

const Stack = createStackNavigator();

export default function PostStack() {
  // independent={true} is so that we disconnect this nav container from the outer one
  return (
    <Stack.Navigator
      initialRouteName="YourPostsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="YourPostsScreen" component={YourPostsScreen} />
      <Stack.Screen name="FindServicesScreen" component={FindServicesScreen} />
      <Stack.Screen name="MediaUploadScreen" component={MediaUploadScreen} />
      <Stack.Screen name="DescribeIssueScreen" component={DescribeIssueScreen}/>
      <Stack.Screen name="InputAvailabilityScreen" component={InputAvailabilityScreen}/>
      <Stack.Screen name="SelectLocationScreen" component={SelectLocationScreen}/>
      <Stack.Screen name="IssueDetailsScreen" component={IssueDetailsScreen} />
    </Stack.Navigator>
  );
}
