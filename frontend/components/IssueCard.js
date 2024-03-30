import { View, Text, Image, Pressable } from "react-native";

const IssueCard = ({ issue, onPress }) => {
  return (
    <Pressable
      className="bg-white rounded-lg shadow-md my-1 p-4"
      onPress={onPress}
    >
      {issue.media ? (
        <Image
          source={{ uri: issue.media }}
          resizeMode="cover"
          className="h-32 w-full rounded"
        />
      ) : null}
      <View className="pl-2">
        <Text className="font-bold text-lg">{issue.title}</Text>
        <Text>{issue.description}</Text>
        <Text className="text-gray-700 mt-3">Category: {issue.category}</Text>
      </View>
    </Pressable>
  );
};

export default IssueCard;
