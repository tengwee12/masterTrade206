import { SafeAreaView, Text, View } from "react-native"
import Logo from "../components/Logo"

export default function HomePage() {
    return (
        <SafeAreaView>
            <View className="absolute top-0 left-0 bg-purple h-40"/>
            <Logo />
            <Text></Text>
        </SafeAreaView>
    )
}