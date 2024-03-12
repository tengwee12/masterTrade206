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
    <View className="w-32">
      <Pressable onPress={handleClickPlumber}>
        <Image
          source={{ uri: plumberData.image }}
          className="h-32 w-32 rounded"
        />
        <View className="flex flex-row items-center justify-between">
          <Text className="">{plumberData.name}</Text>
          <View className="flex flex-row items-center">
            <Text className="">{plumberData.averageRating}</Text>
            <FontAwesome name="star" size={24} color="#f1c40f" />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
