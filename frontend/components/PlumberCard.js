import { Image, Text, View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default PlumberCard = ({ plumberData }) => {
  const navigation = useNavigation();

  const dummyPlumber = {
    name: "Mario",
    rating: 3.5,
    imageLink: "../assets/mario.png",
  };

  const handleClickPlumber = () => {
    navigation.navigate("Plumber", {
      plumberID: plumberData.id,
    });
  };

  return (
    <View>
      <Pressable onPress={handleClickPlumber}>
        <Image
          source={require("../assets/mario.png")}
          className="h-24 w-24 rounded"
        />
        <View className="flex flex-row items-center justify-between">
          <Text className="">{dummyPlumber.name}</Text>
          <Text>{plumberData.id}</Text>
          <View className="flex flex-row items-center">
            <Text className="">{dummyPlumber.rating}</Text>
            <FontAwesome name="star" size={24} color="#f1c40f" />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
