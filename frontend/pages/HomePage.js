import { SafeAreaView, Text, View } from "react-native";
import Logo from "../components/Logo";
import PurpleButton from "../components/PurpleButton";

import PlumberProfile from "../components/PlumberProfile";

export default function HomePage({ navigation }) {
  const handleResetNavigation = () => {
    navigation.reset()
  }

  return (
    <SafeAreaView>
        <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
        <Logo />
        <PurpleButton text="Reset Navigation" onPress={handleResetNavigation} />

        <PlumberProfile />
    </SafeAreaView>
  );
}
