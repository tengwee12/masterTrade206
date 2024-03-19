import { Text } from "react-native";

export default Logo = ({ text }) => {
  return (
    <Text className="text-white font-poppinsExtrabold text-center p-3 pt-12 drop-shadow text-lg">
      {text ? text : "mastertrade"}
    </Text>
  );
};
