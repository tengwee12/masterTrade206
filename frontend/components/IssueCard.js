import { Text, Image, Pressable } from "react-native";

const IssueCard = ({ issue, onPress }) => {
  return (
    <Pressable
      className="bg-white rounded-lg shadow-md my-2 p-4"
      onPress={onPress}
    >
      {issue.media ? (
        <Image
          source={{ uri: issue.media }}
          resizeMode="cover"
          className="h-32 w-full rounded"
        />
      ) : null}

      <Text className="font-bold text-lg">{issue.title}</Text>
      <Text>{issue.description}</Text>
      <Text className="text-gray-700 mt-3">种类: {issue.category}</Text>
      <Text>地址: {issue.address}</Text>
    </Pressable>
  );
};

export default IssueCard;
