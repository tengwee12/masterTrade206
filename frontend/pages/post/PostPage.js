import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FindServicesScreen from "./FindServicesScreen";
import MediaUploadScreen from "./MediaUploadScreen";
import DescribeIssueScreen from "./DescribeIssueScreen";
import InputAvailabilityScreen from "./InputAvailabilityScreen";
import SelectLocationScreen from "./SelectLocationScreen";
import YourPostsScreen from "./YourPostsScreen";

const Stack = createStackNavigator();

export default function Post() {
    // independent={true} is so that we disconnect this nav container from the outer one
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="YourPostsScreen">
                <Stack.Screen
                    name="YourPostsScreen"
                    component={YourPostsScreen}
                />
                <Stack.Screen
                    name="FindServicesScreen
            "
                    component={FindServicesScreen}
                />
                <Stack.Screen
                    name="MediaUploadScreen"
                    component={MediaUploadScreen}
                />
                <Stack.Screen
                    name="DescribeIssueScreen"
                    component={DescribeIssueScreen}
                />
                <Stack.Screen
                    name="InputAvailabilityScreen
            "
                    component={InputAvailabilityScreen}
                />
                <Stack.Screen
                    name="SelectLocationScreen"
                    component={SelectLocationScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
