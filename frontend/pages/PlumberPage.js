import { SafeAreaView, View, Text, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PlumberPage({ route, navigation }) {
  const { plumberID } = route.params;

  return (
    <SafeAreaView>
      <Image source={require("../assets/mario.png")} />

      <View className="flex flex-row items-center">
        <View>
          <Text className="font-bold text-base">Plumber {plumberID}</Text>
          <View className="flex flex-row items-center">
            <MaterialCommunityIcons
              name="check-decagram"
              size={24}
              color="#00adff"
            />
            <Text>Licensed with PUB</Text>
          </View>
        </View>
        <PurpleButton text="Chat" />
      </View>
      <View className="flex flex-col gap-y-4">
        <View>
          <Text className="font-bold text-sm">Operating Hours</Text>
          <Text className="text-sm">Monday - Friday, 8am - 6pm</Text>
          <Text className="text-sm">
            *Emergency services are available at a surcharge
          </Text>
        </View>
        <View>
          <Text className="font-bold text-sm">Description</Text>
          <Text className="text-sm">
            More than 15 years experience in the industry, Plumber Phua is
            always committed to being responsible and responsive to all our
            customers’ issues
          </Text>
        </View>
        <Text className="font-bold text-sm">Services Provided</Text>
        <Text className="font-bold text-sm">Reviews</Text>
      </View>
    </SafeAreaView>
  );
}
