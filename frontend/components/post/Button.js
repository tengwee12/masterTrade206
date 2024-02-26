import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function ListItem({ text }) {
    const [pressed, setPressed] = useState(false);
    const handlePress = () => {
        setPressed(!pressed);
    };

    return (
        <TouchableOpacity
            className="bg-athensGray rounded-lg p-2 w-90% m-4"
            onPress={handlePress}
        >
            <Text>{text}</Text>
            {pressed && <Text>Pressed!</Text>}
        </TouchableOpacity>
    );
}
