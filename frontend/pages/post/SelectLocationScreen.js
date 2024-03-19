import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useState } from "react";
import { Keyboard } from "react-native";
import { axiosInstance } from "../../services/axios";
import PurpleButton from "../../components/PurpleButton";

const SelectLocationScreen = ({ navigation, route }) => {
  const { issue } = route.params;

  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");

  const saveLocation = async () => {
    if (postalCode && address) {
      const updatedIssue = {
        ...issue,
        address: `${district}:${address}:${postalCode}`,
      };
      try {
        const response = await axiosInstance.post("/api/issue", updatedIssue);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
      navigation.navigate("YourPostsScreen");
      return;
    }

    let message = "Following fields cannot be empty: \n";
    if (!District) message += "District\n";
    if (!postalCode) message += "Postal Code\n";
    if (!address) message += "Address\n";

    Alert.alert(message);
    Alert.alert("" + message);
  };

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <BackButton color="white" />
      <Logo text="Create New Post" />
      <View className="p-4">
        <Text className="pb-2 pt-2">Step 5 of 5</Text>
        <Text className="font-bold text-lg pb-2">
          Where is the issue located?
        </Text>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <Text className="pb-2 pt-4">District</Text>
            <TextInput
              value={district}
              placeholder="eg. Sengkang"
              onChangeText={setDistrict}
            />
            <Text className="pb-2 pt-4">Address</Text>
            <TextInput
              value={address}
              placeholder="eg. Blk 123 Hello Ave 100 #12-3456"
              onChangeText={setAddress}
            />
            <Text className="pb-2 pt-4">Postal Code</Text>
            <TextInput
              value={postalCode}
              placeholder="eg. 266913"
              onChangeText={setPostalCode}
            />
          </View>
        </TouchableWithoutFeedback>
        <PurpleButton text="Submit" onPress={saveLocation} />
      </View>
    </View>
  );
};

export default SelectLocationScreen;
