import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FindServicesPage from "./FindServicesPage";
import MediaUploadPage from "./MediaUploadPage";
import DescribeIssuePage from "./DescribeIssuePage";
import InputAvailabilityPage from "./InputAvailabilityPage";
import SelectLocationPage from "./SelectLocationPage";
import YourPostsPage from "./YourPostsPage";

const Stack = createStackNavigator();

export default function Post() {
    // independent={true} is so that we disconnect this nav container from the outer one
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="YourPostsPage">
                <Stack.Screen name="YourPostsPage" component={YourPostsPage}/>
                <Stack.Screen name="FindServicesPage" component={FindServicesPage}/>
                <Stack.Screen name="MediaUploadPage" component={MediaUploadPage}/>
                <Stack.Screen name="DescribeIssuePage" component={DescribeIssuePage}/>
                <Stack.Screen name="InputAvailabilityPage" component={InputAvailabilityPage}/>
                <Stack.Screen name="SelectLocationPage" component={SelectLocationPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
