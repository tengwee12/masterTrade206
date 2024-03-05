import { Image, Text, View } from "react-native";

const PlumberProfile = () => {
    const dummyPlumber = {
        name: "Mario",
        rating: 3.5,
        imageLink: "../assets/mario.png",
    };

    return (
        <View>
            <Image source={require("../assets/mario.png")} />
            <Text className="">{dummyPlumber.name}</Text>
        </View>
    );
};

export default PlumberProfile;
