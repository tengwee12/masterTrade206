import { SafeAreaView, Text, View } from "react-native";
import Logo from "../components/Logo";

export default function HomePage() {
  return (
    <SafeAreaView>
        <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
        <Logo />
    </SafeAreaView>
  );
}
