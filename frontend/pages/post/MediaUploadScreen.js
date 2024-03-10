// step 2 of 5
import { View, Image, Pressable, Text, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import Button from "../../components/Button.js";


const PictureUploadPage = ({ navigation }) => {
    const [images, setImages] = useState([]);

    const requestPermissions = async (useLibrary) => {
        let status
        if (useLibrary) {
            const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
            status = response.status;
        } else {
            const response = await ImagePicker.requestCameraPermissionsAsync();
            status = response.status;
        }
        if (status !== 'granted') {
            alert('Sorry, we need permissions to make this work!');
            return false;
        }
        return true;
    }

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

        try {
            const imageUri = result.assets[0].uri;
            setImages(prev => [...prev, imageUri]);
            console.log("success: ", imageUri)
        } catch(error) {
            console.error(error)
            throw error
        }

        console.log(images)
    };

    // const fetchImage = async (uri) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     return blob;
    // }


    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 2 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                Upload photos/videos of the issue
            </Text>
            <View className="">
                <View className="justify-between">
                    <Button
                        text="Photo Library"
                        onPress={() => selectImage(true)}
                    />
                    <Button text="Use Camera" onPress={() => selectImage(false)} />
                </View>
                <FlatList 
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image 
                            source={{ uri: item }}
                            style={{ width: 300, height: 200, marginBottom: 10 }} // Explicit dimensions for debugging
                        />
                    )}
                    contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
                    ListEmptyComponent={() => (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>
                            No images/videos uploaded yet.
                        </Text>
                    )}
                />
            </View>
        </View>
    );
};

export default PictureUploadPage;
