import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

export default function StarRating({ rating }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesome key={i} name="star" size={24} color="#f1c40f" />);
    }
    return stars;
  };

  return <View className="flex flex-row">{renderStars()}</View>;
}
