import { View, Text, Image } from "react-native";
import StarRating from "../components/StarRating";

export default function UserReview({ reviewData }) {
  const createdAtDate = new Date(reviewData.createdAt);
  const currentDate = new Date();
  const timeDifference = Math.abs(currentDate - createdAtDate);
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let readableDate;

  if (daysDifference === 0) {
    // If the difference is 0, it means the date is today
    const hours = createdAtDate.getHours();
    const minutes = createdAtDate.getMinutes();
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;
    readableDate = `Today at ${formattedTime}`;
  } else {
    // If the difference is not 0, display "X days ago"
    readableDate = `${daysDifference} days ago`;
  }

  return (
    <View key={reviewData.id} className="py-3">
      <Text className="font-bold">{reviewData.username}</Text>
      <View className="flex flex-row items-center">
        <Text className="mr-2">{reviewData.rating?.toFixed(1)}</Text>
        <StarRating rating={reviewData.rating} />
        <Text className="pl-3">{readableDate}</Text>
      </View>
      <Text>{reviewData.description}</Text>
      {reviewData.media && reviewData.media.length > 0 && <Image source={{ uri: reviewData.media }} className="h-32 w-32 my-2" resizeMode="cover"/>}
    </View>
  );
}
