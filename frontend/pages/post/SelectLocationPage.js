// step 5 of 5
import { Text, View } from "react-native";
import Button from "../../components/Button";

const SelectLocationPage = ({navigation}) => {
    return <View>
        <Text>User will select their location here</Text>
        <Button text="Go back to home page" onPress={() => navigation.navigate('FindServicesPage')} />
    </View>;
};

export default SelectLocationPage;
