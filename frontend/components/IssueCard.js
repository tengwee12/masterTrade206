import { View, Text, Image, Pressable } from "react-native";

const IssueCard = ({ issue, onPress }) => {
  return (
    <Pressable
      className="bg-white rounded-lg shadow-md m-2 p-4 flex flex-row"
      onPress={onPress}
    >
      {issue.media ? (
        <Image
          source={{ uri: issue.media }}
          resizeMode="cover"
          className="h-32 w-32 rounded"
        />
      ) : null}
      <View className="pl-2">
        <Text className="font-bold">{issue.title}</Text>
        <Text>{issue.description}</Text>
        <Text className="text-gray-700">{issue.category}</Text>
      </View>
    </Pressable>
  );
};

export default IssueCard;
