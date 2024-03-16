import { View, Text, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PurpleButton from "../components/PurpleButton";
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";
import { useNavigation } from "@react-navigation/native";
import UserReview from "../components/UserReview";
import StarRating from "../components/StarRating";
import { getItemAsync } from "expo-secure-store";
import BackButton from "../components/BackButton";

export default function PlumberPage({ route }) {
  const { plumberID } = route.params;
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [plumberData, setPlumberData] = useState({});

  const getReviews = async () => {
    try {
      const token = await getItemAsync("token");
      let result = await axiosInstance.get(
        `/api/review/getplumber/${plumberID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("get reviews:", result.data);
      setReviews(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlumberData = async () => {
    const response = await axiosInstance.get("/api/plumber", {
      params: {
        id: plumberID,
      },
    });

    console.log("get plumber data:", response.data[0]);
    setPlumberData(response.data[0]);
  };

  const navigateToReviewForm = () => {
    navigation.navigate("Review", { plumberID: plumberID });
  };

  useEffect(() => {
    getReviews();
    getPlumberData();
  }, []);

  return (
    <ScrollView>
      {plumberData && (
        <>
          <Image
            source={{ uri: plumberData.image }}
            className="w-screen h-64"
            resizeMode="cover"
          />
          <BackButton color="white" />

          <View className="flex flex-row items-center">
            <View className="pr-3">
              <Text className="font-bold text-base">{plumberData.name}</Text>
              {plumberData.license && (
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
              <Text className="text-sm">{plumberData.description}</Text>
            </View>
            <Text className="font-bold text-sm">Services Provided</Text>
            <View className="flex flex-row">
              <View className="w-1/2">
                <Image
                  source={require("../assets/sink-leak.jpg")}
                  className="h-32"
                />
                <Text>Sink Choke or Leak ($80-100)</Text>
              </View>
              <View className="w-1/2">
                <Image
                  source={require("../assets/toilet-leak.jpg")}
                  className="h-32"
                />
                <Text>Toilet Bowl Choke or Leak ($60)</Text>
              </View>
            </View>
            <View className="flex flex-row">
              <View className="w-1/2">
                <Image
                  source={require("../assets/tap-leak.jpg")}
                  className="h-32"
                />
                <Text>Water Tap Leak($90-100)</Text>
              </View>
              <View className="w-1/2">
                <Image
                  source={require("../assets/heater-leak.jpg")}
                  className="h-32"
                />
                <Text>Water Heater Installation ($70-90)</Text>
              </View>
            </View>
            <Text className="font-bold text-sm">Reviews</Text>
            <View className="flex flex-row items-center">
              <Text className="pr-2">
                {plumberData.averageRating.toFixed(1)}
              </Text>
              <StarRating rating={plumberData.averageRating} />
              <Text className="pl-2">{reviews.length} review(s)</Text>
            </View>

            <PurpleButton
              text="Write a Review"
              onPress={navigateToReviewForm}
            />
            {reviews.length > 0 &&
              reviews.map((r) => <UserReview reviewData={r} key={r.id} />)}
          </View>
        </>
      )}
    </ScrollView>
  );
}
