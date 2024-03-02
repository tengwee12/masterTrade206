import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import AuthStack from "./navigation/AuthStack";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <NavigationContainer>
            {isAuthenticated ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
}
