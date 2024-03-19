// step 2 of 5
import { View, Image, Text, FlatList, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "../../components/Button.js";

const MediaUploadPage = ({ navigation, route }) => {
  const { issue } = route.params;
  console.log(issue);

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const requestPermissions = async (useLibrary) => {
    let status;
    if (useLibrary) {
      const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
      status = response.status;
    } else {
      const response = await ImagePicker.requestCameraPermissionsAsync();
      status = response.status;
    }
    if (status !== "granted") {
      alert("Sorry, we need permissions to make this work!");
      return false;
    }
    return true;
  };

  const selectImage = async (useLibrary) => {
    const hasPermission = await requestPermissions(useLibrary);

    if (!hasPermission) {
      return;
    }

    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (result.canceled) {
      return;
    }

    setError("");

    try {
      const image_link = result.assets[0].uri;
      setImages((prev) => [...prev, image_link]);
      console.log("success: ", image_link);
    } catch (error) {
      console.error(error);
      throw error;
    }

    // console.log(images);
  };

  const handleMediaUpload = () => {
    if (images.length == 0) {
      setError("No images uploaded yet!");
      return;
    }

    const updatedIssue = {
      ...issue,
      media: "media string",
    };
    console.log("After adding media: \n", updatedIssue);
    navigation.navigate("DescribeIssueScreen", { issue: updatedIssue });
  };

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <BackButton color="white" />
      <Logo text="Create New Post" />
      <View className="p-4">
        <Text className="pb-2 pt-2">Step 2 of 5</Text>
        <Text className="font-bold text-lg pb-2">
          Upload photos/videos of the issue
        </Text>
        {error.length > 0 && <Text className="text-red-600 mb-2">{error}</Text>}
        <FlatList
          horizontal
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: 300,
                height: 200,
                marginBottom: 10,
                marginRight: 10,
              }} // Explicit dimensions for debugging
            />
          )}
          contentContainerStyle={{
            alignItems: "center",
            flexGrow: 1,
          }}
        />
        <Pressable
          className="bg-white rounded-lg shadow-md my-2 p-4"
          onPress={() => selectImage(true)}
        >
          <Text>Select from Photo Library</Text>
        </Pressable>
        <Pressable
          className="bg-white rounded-lg shadow-md my-2 p-4"
          onPress={() => selectImage(false)}
        >
          <Text>Use Camera</Text>
        </Pressable>
        <PurpleButton text="Next" onPress={handleMediaUpload} />
      </View>
    </View>
  );
};

export default MediaUploadPage;
