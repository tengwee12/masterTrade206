import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import AuthStack from "./navigation/AuthStack";
import { useFonts, Poppins_800ExtraBold } from "@expo-google-fonts/poppins"
import { Text } from "react-native"

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [fontsLoaded] = useFonts({
        Poppins_800ExtraBold
    })    

    if (!fontsLoaded) {
        return <Text>Fonts not loaded</Text>
    } else {
        return (
            <NavigationContainer>
                {isAuthenticated ? <TabNavigator /> : <AuthStack />}
            </NavigationContainer>
        );
    }
}
