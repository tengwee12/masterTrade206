import { Pressable, Text } from "react-native";

export default PurpleButton = ({ text, onPress }) => {
    return (
        <Pressable
            className="bg-purple p-4 rounded-lg my-5 grow"
            onPress={onPress}
        >
            <Text className="text-white font-medium text-center">{text}</Text>
        </Pressable>
    );
};