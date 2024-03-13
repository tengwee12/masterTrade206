import { Image, Text, View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default PlumberCard = ({ plumberData }) => {
  const navigation = useNavigation();

  const handleClickPlumber = () => {
    navigation.navigate("Plumber", {
      plumberID: plumberData.id,
    });
  };

  return (
    <Pressable onPress={handleClickPlumber} className="w-32 mr-3">
      <Image
        source={{ uri: plumberData.image }}
        className="h-32 w-32 rounded"
      />

      <Text className="">{plumberData.name}</Text>
      <View className="flex flex-row items-center">
        <Text className="">{plumberData.averageRating}</Text>
        <FontAwesome name="star" size={24} color="#f1c40f" />
      </View>
    </Pressable>
  );
};
