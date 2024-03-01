import { View, Text, Alert } from "react-native";
import Button from "../../components/Button";

export default function App({navigation}) {

    const handlePress = (serviceType) => {
        Alert.alert(serviceType);
    };

    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 1 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                What kind of service are you looking for?
            </Text>
            <Button text="Pipes" onPress={() => handlePress("Pipes")} />
            <Button
                text="Ceiling Leak"
                onPress={() => handlePress("Ceiling Leak")}
            />
            <Button
                text="Toilet Bowl"
                onPress={() => handlePress("Toilet Bowl")}
            />

            <Button text="Go to Media Upload Page" onPress={() => navigation.navigate('PictureUploadPage')}/>
        </View>
    );
}
