// step 3 of 5
import { View, Text } from "react-native";
import Button from "../../components/Button";

const DescribeIssuePage = ({navigation}) => {
    return <View>
        <Text>The user describes the problem here</Text>
        <Button text="Go to Input Availability Page" onPress={() => navigation.navigate('InputAvailabilityPage')} />
    </View>;
};

export default DescribeIssuePage;
