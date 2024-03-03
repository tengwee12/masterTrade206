import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import AuthStack from "./navigation/AuthStack";
import { useFonts, Poppins_800ExtraBold } from "@expo-google-fonts/poppins";
import { Text } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

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
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
