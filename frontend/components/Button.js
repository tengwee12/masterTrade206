import { Pressable, Text } from "react-native";

export default Button = ({ text, onPress }) => {
    return (
        <Pressable
            className="bg-silver p-4 m-4 rounded-lg"
            onPress={onPress}
        >
            <Text className="text-black">{text}</Text>
        </Pressable>
    );
};
