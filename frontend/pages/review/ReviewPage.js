import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  Image, 
  FlatList,
  ScrollView
} from "react-native";
import { Rating } from "react-native-ratings";
import PurpleButton from "../../components/PurpleButton";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { uploadData } from "aws-amplify/storage";
import { axiosInstance } from "../../services/axios";
import { useNavigation } from "@react-navigation/native";

const ReviewPage = ({ route }) => {
  const navigation = useNavigation();

  const { plumberID } = route.params;
  const [images, setImages] = useState([]);
  const [s3uris, setS3uris] = useState([]);
  const [rating, setRating] = useState({});
  const [description, setDescription] = useState("");

  const handleRatingCompleted = (rating) => {
    setRating(rating);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    console.log(result);
    try {
      const img = await fetchImageFromUri(result.assets[0].uri);
      console.log(img);
      const uploadResult = await uploadData({
        key: result.assets[0].fileName,
        data: img,
        options: {
          accessLevel: "guest",
        },
      }).result;
      setImages((prev) => [...prev, result.assets[0].uri]);
      console.log("Succeeded ", result.assets[0].uri);
      console.log(uploadResult)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const handlePostReview = async () => {
    try {
      let result = await axiosInstance.post("/api/review/", {
        plumberId: plumberID,
        customerId: 1,
        description: description,
        dateTime: new Date(),
        rating: rating
      });
      console.log(result.data);
      navigation.navigate("Plumber", { plumberID: plumberID });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View className="p-4 bg-white flex flex-col gap-y-4">
        <Text>Rate your experience for {plumberID}</Text>
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
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: 300, height: 200, marginBottom: 10 }} 
            />
          )}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
        />
        <PurpleButton text="Post Review" onPress={handlePostReview} />
      </View>
    </ScrollView>
  );
};

export default ReviewPage;
