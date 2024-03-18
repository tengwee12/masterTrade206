import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Alert,
} from "react-native";
import { useState } from "react";
import { Keyboard } from "react-native";
import Button from "../../components/Button";
import { axiosInstance } from "../../services/axios";

const SelectLocationScreen = ({ navigation, route }) => {
    const { issue } = route.params;

    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");

    const saveLocation = async () => {
        if (country && postalCode && address) {
            const updatedIssue = {
                ...issue,
                address: `${country}:${postalCode}:${address}`,
            };
            try {
                const response = await axiosInstance.post("/api/issue", updatedIssue);
                console.log(response.data);
            } catch (error) {
                console.error(error.message);
            }
            Alert.alert("Complete!");
            navigation.navigate("YourPostsScreen");
            return;
        }

        let message = "Following fields cannot be empty: \n";
        if (!country) message += "Country\n";
        if (!postalCode) message += "Postal Code\n";
        if (!address) message += "Address\n";

        Alert.alert(message);

        Alert.alert("" + message);
    };

    const onChangeCountry = (country) => {
        setCountry(country);
    };

    const onChangePostalCode = (postalCode) => {
        setPostalCode(postalCode);
    };

    const onChangeAddress = (address) => {
        setAddress(address);
    };

    return (
        <View className="p-4">
            <Text className="pb-2 pt-2">Step 5 of 5</Text>
            <Text className="font-bold text-lg pb-2">
                Where is the issue located?
            </Text>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <Text className="pb-2 pt-4">Country</Text>
                    <TextInput
                        value={country}
                        placeholder="eg. Singapore"
                        onChangeText={onChangeCountry}
                    />

                    <Text className="pb-2 pt-4">Postal Code</Text>
                    <TextInput
                        value={postalCode}
                        placeholder="eg. 266913"
                        onChangeText={onChangePostalCode}
                    />

                    <Text className="pb-2 pt-4">Address</Text>
                    <TextInput
                        value={address}
                        placeholder="eg. Blk 123 Hello Ave 100 #12-3456"
                        onChangeText={onChangeAddress}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Button text="Confirm Location" onPress={saveLocation} />
        </View>
    );
};

export default SelectLocationScreen;
