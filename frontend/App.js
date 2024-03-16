import { NavigationContainer } from "@react-navigation/native";
import UserTabNavigator from "./navigation/UserTabNavigator";
import AuthStack from "./navigation/AuthStack";
import { useFonts, Poppins_800ExtraBold } from "@expo-google-fonts/poppins";
import { Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import PlumberTabNavigator from "./navigation/PlumberTabNavigator";

const Stack = createStackNavigator();
Amplify.configure(awsconfig);

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Fonts not loaded</Text>;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthStack" component={AuthStack}/>
            <Stack.Screen name="UserTabNavigator" component={UserTabNavigator} />
            <Stack.Screen name="PlumberTabNavigator" component={PlumberTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
