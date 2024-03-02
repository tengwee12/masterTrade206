// step 4 of 5
import { Text, View } from "react-native";
import Button from "../../components/Button";

const InputAvailabilityPage = ({navigation}) => {
    return <View>
        <Text>User will input their available dates and times here</Text>
        <Button text="Go to Select Location Screen" onPress={() => navigation.navigate('SelectLocationScreen')} />
    </View>;
};

export default InputAvailabilityPage;
