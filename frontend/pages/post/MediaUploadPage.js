// step 2 of 5
import { View, Image, Platform, Text } from 'react-native'
import Button from "../../components/Button";

const PictureUploadPage = ({navigation}) => {
    return (
        <View className="p-4">
            <Text>Photo/Video upload function will be here</Text>
            <Button text="Go to Describe Issue Page" onPress={() => navigation.navigate('DescribeIssuePage')}/>
        </View>
    );
};

export default PictureUploadPage;
