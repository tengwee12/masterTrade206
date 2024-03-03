import { useState } from "react";
import { SafeAreaView, Text, TextInput, View, Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import PurpleButton from "../../components/PurpleButton";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ReviewPage = () => {
  const [images, setImages] = useState({});
  const [rating, setRating] = useState({});
  const [description, setDescription] = useState("");

  const handleRatingCompleted = (rating) => {
    setRating(rating);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  };

  const handlePostReview = () => {
    
  }

  return (
    <SafeAreaView>
      <View className="p-4 bg-white flex flex-col gap-y-4">
        <Text>Rate your experience</Text>
        <Rating
          defaultRating={0}
          ratingCount={5}
          onFinishRating={handleRatingCompleted}
        />
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Please elaborate on your experience"
          onChangeText={setDescription}
          value={description}
          className="p-2 bg-textInputGray"
        />
        <Pressable
          className="p-4 rounded border border-black flex flex-col items-center"
          onPress={pickImage}
        >
          <Ionicons name="camera-outline" size={50} color="black" />
          <Text>Add Photos/Videos</Text>
        </Pressable>
        <PurpleButton text="Post Review" onPress={handlePostReview}/>
      </View>
    </SafeAreaView>
  );
};

export default ReviewPage;
