import { View, Text, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PurpleButton from "../components/PurpleButton";
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";
import { useNavigation } from "@react-navigation/native";
import UserReview from "../components/UserReview";
import StarRating from "../components/StarRating";

export default function PlumberPage({ route }) {
  const { plumberID } = route.params;
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const getReviews = async () => {
    try {
      let result = await axiosInstance.get(
        `/api/review/getByPlumber/${plumberID}`,
        {
          headers: {
            Authorization: "INSERT TOKEN HERE",
          },
        }
      );

      let reviewsData = result.data;
      const totalSum = reviewsData.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      setAverageRating(totalSum / reviews.length);

      console.log(reviewsData);
      setReviews(reviewsData);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToReviewForm = () => {
    navigation.navigate("Review", { plumberID: plumberID });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ScrollView>
      <Image source={require("../assets/mario.png")} />

      <View className="flex flex-row items-center">
        <View className="pr-3">
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
        {averageRating > 0 && (
          <View className="flex flex-row items-center">
            <Text className="pr-2">{averageRating}</Text>
            <StarRating rating={averageRating}/>
            <Text className="pl-2">{reviews.length} reviews</Text>
          </View>
        )}
        <PurpleButton text="Write a Review" onPress={navigateToReviewForm} />
        {reviews.length > 0 &&
          reviews.map((r) => <UserReview reviewData={r} />)}
      </View>
    </ScrollView>
  );
}
