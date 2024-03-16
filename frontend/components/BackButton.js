import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default BackButton = ({ color }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable className="absolute top-10 left-2" onPress={handleGoBack}>
      <Ionicons name="chevron-back-sharp" size={32} color={color} />
    </Pressable>
  );
};
