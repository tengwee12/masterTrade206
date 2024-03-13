// step 5 of 5
import { Alert, Text, View } from "react-native";
import Button from "../../components/Button";
import MapView, { Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";
import { useState, useEffect } from "react";

const SelectLocationPage = ({ navigation }) => {
    const handlePress = () => {
        Alert.alert("Post created!", "", [
            {
                text: "OK",
                onPress: () => navigation.navigate("YourPostsScreen"),
            },
        ]);
    };

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // useEffect(() => {
    //     Geolocation.getCurrentPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setRegion({
    //                 ...region,
    //                 latitude,
    //                 longitude,
    //             });
    //         },
    //         (error) => console.log("Failed to get location", error),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    // }, []);

    // const handleMapPress = (e) => {
    //     const { latitude, longitude } = e.nativeEvent.coordinate;
    //     setSelectedLocation({ latitude, longitude });
    // };

    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 4 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                When are you available?
            </Text>
            <MapView region={region} onPress={handleMapPress}>
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        title={selectedLocation}
                    />
                )}
            </MapView>
            <Button
                text="Set Location"
                onPress={() =>
                    console.log("Selected Location:", selectedLocation)
                }
            />
            <Button text="Go back to home page" onPress={handlePress} />
        </View>
    );
};

export default SelectLocationPage;
