import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FindServicesPage from "./FindServicesPage";
import PictureUploadPage from "./PictureUploadPage";
import DescribeIssuePage from "./DescribeIssuePage";
import InputAvailabilityPage from "./InputAvailabilityPage";
import SelectLocationPage from "./SelectLocationPage";

const Stack = createStackNavigator();

export default function Post() {
    // independent={true} is so that we disconnect this nav container from the outer one
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="FindServicesPage">
                <Stack.Screen name="FindServicesPage" component={FindServicesPage}/>
                <Stack.Screen name="PictureUploadPage" component={PictureUploadPage}/>
                <Stack.Screen name="DescribeIssuePage" component={DescribeIssuePage}/>
                <Stack.Screen name="InputAvailabilityPage" component={InputAvailabilityPage}/>
                <Stack.Screen name="SelectLocationPage" component={SelectLocationPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
