// step 2 of 5
import { View, Image, Platform, Text, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import Button from "../../components/Button.js";

const imgDir = FileSystem.documentDirectory + "../../images/";

const ensureDirExists = async () => {
    const dir = await FileSystem.getInfoAsync(imgDir);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }
};

const PictureUploadPage = ({ navigation }) => {
    // checks whether the user is currently uploading an image
    const [isUploading, setIsUploading] = useState(false);
    // store the images in list
    const [images, setImages] = useState([]);

    // load images on entering the page
    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        await ensureDirExists();
        const files = await FileSystem.readDirectoryAsync(imgDir);
        if (files.length > 0) {
            setImages(files.map((f) => imgDir + f));
        }
    };

    // save image with format
    const saveImage = async (uri) => {
        await ensureDirExists();
        const fileName = new Date().getTime() + ".jpeg";
        const dst = imgDir + fileName;
        await FileSystem.copyAsync({ from: uri, to: dst });
        setImages([...images, dst]);
    };

    // delete image
    const deleteImage = async (uri) => {
        await FileSystem.deleteAsync(uri);
        setImages(images.filter((i) => i !== uri));
    };

    // * this function is for the backend request
    const uploadImage = async (uri) => {
        setIsUploading(true);
        // TODO: code to upload image to backend
        setIsUploading(false);
    };

    // select image from camera or library
    const selectImage = async (useLibrary) => {
        let result;
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
        };

        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    const renderItem = ({ item }) => {
        const filename = item.split("/").pop();
        return (
            <View className="flex-row m-1 items-center gap-5">
                <Image className="w-4/5 h-2/4 " source={{ uri: item }} />
                <Text className="flex-1">{filename}</Text>
                <Ionicons.Button
                    name="cloud-upload"
                    onPress={uploadImage(item)}
                />
                <Ionicons.Button name="trash" onPress={deleteImage(item)} />
            </View>
        );
    };

    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 2 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                Upload photos/videos of the issue
            </Text>
            <View className="flex-1 gap-5">
                <Button
                    text="Photo Library"
                    onPress={() => selectImage(true)}
                />
                <Button text="Use Camera" onPress={() => selectImage(false)} />
            </View>

            <FlatList data={images} renderItem={renderItem} />
        </View>
    );
};

export default PictureUploadPage;
