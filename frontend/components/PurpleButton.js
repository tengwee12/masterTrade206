import { Pressable, Text } from "react-native";

export default PurpleButton = ({ text, onPress }) => {
    return (
        <Pressable
            className="bg-purple p-4 rounded-lg mt-5 grow flex flex-row justify-center items-center"
            onPress={onPress}
        >
            <Text className="text-white font-medium text-center">{text}</Text>
        </Pressable>
    );
};