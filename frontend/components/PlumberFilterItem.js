import { View, Image, Text, Pressable } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PlumberFilterItem({ plumber }) {
  const navigation = useNavigation();

  const handleClickPlumber = () => {
    navigation.navigate("Plumber", {
      plumberID: plumber.id,
    });
  };

  return (
    <Pressable onPress={handleClickPlumber} className="flex flex-row pb-3">
      <Image source={{ uri: plumber.image }} className="h-32 w-32 rounded" />
      <View className="pl-3">
        <Text className="font-bold">{plumber.name}</Text>
        <View className="flex flex-row items-center">
          <FontAwesome name="star" size={24} color="#f1c40f" />
          <Text className="pl-1">{plumber.averageRating.toFixed(1)}</Text>
        </View>
        <View className="flex flex-row items-center">
          <Entypo name="location-pin" size={24} color="black" />
          <Text>Sengkang</Text>
        </View>
        <Text>🚨 Emergency Services</Text>
        <Text>💴 $50-$200</Text>

        {plumber.license && (
          <View className="flex flex-row items-center">
            <MaterialCommunityIcons
              name="check-decagram"
              size={24}
              color="#00adff"
            />
            <Text>Licensed with PUB</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
