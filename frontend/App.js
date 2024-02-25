import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import ListItem from "./components/post/ListItem";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text>This will be the home page ^.^</Text>
            <ListItem text={"Pipes"} />
            <StatusBar style="auto" />
        </View>
    );
}
