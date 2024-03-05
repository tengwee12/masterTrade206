import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PlumberProfile = () => {
    const dummyPlumber = {
        id: 1,
        name: "Mario",
        rating: 3.5,
        image: "mario",
    };

    // this is the only workaround i know for now (manual array indexing)
    // ? if anyone knows a better way, help me implement it
    const images = {
        mario: require("../assets/mario.png"),
        // luigi: require("../assets/luigi.png"),
        // waluigi: require("../assets/waluigi.png"),
    };

    return (
        <View className="flex-col items-center w-48 h-48 mb-4">
            <Image
                source={images[dummyPlumber.image]}
                className="w-full h-full rounded"
            />
            <View className="flex-row w-48 items-center justify-between p-1 mt-1">
                <Text className="text-md font-bold">{dummyPlumber.name}</Text>
                <View className="flex-row items-center">
                    <Icon name="star" size={18} color="#f6be00" />
                    <Text className="text-md ml-1">{dummyPlumber.rating}</Text>
                </View>
            </View>
        </View>
    );
};

export default PlumberProfile;
