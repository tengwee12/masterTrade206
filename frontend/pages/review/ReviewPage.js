import { useState } from "react";
import { SafeAreaView, Text, TextInput, View, Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import PurpleButton from "../../components/PurpleButton";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { uploadData } from 'aws-amplify/storage';

const ReviewPage = ({ route }) => {
  // const { plumberID } = route.params;
  const [image, setImage] = useState();
  const [rating, setRating] = useState({});
  const [description, setDescription] = useState("");

  const handleRatingCompleted = (rating) => {
    setRating(rating);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);
    try {
      const img = await fetchImageFromUri(result.assets[0].uri)
      console.log(img)
      const uploadResult = await uploadData({key: result.assets[0].fileName,
            data: img,
            options: {
            accessLevel: 'guest',
      }}).result;
      console.log('Succeeded ', uploadResult)
    } catch (error) {
      console.log(error)
    }
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const handlePostReview = async () => {
    let result = await axiosInstance.post("/api/review/", {
      plumberId: plumberID,
      customerId: 1,
      description: description,
      rating: rating,
    });
  };

  return (
    <SafeAreaView>
      <View className="p-4 bg-white flex flex-col gap-y-4">
        <Text>Rate your experience for {/* {plumberID} */}</Text>
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
        {image && (
          <View>
            <Image
              source={{ uri: image }}
              style={{ width: 250, height: 250 }}
            />
          </View>
        )}
        <PurpleButton text="Post Review" onPress={handlePostReview} />
      </View>
    </SafeAreaView> 
  );
};

export default ReviewPage;
