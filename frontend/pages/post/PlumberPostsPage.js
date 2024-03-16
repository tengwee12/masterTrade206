import {
  ScrollView,
  Pressable,
  FlatList,
  Text,
  Image,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axios";
import { useNavigation } from "@react-navigation/native";

/* To do: change to filter by date range */

export default function PlumberPostsPage() {
  const [postList, setPostList] = useState([]);
  const navigation = useNavigation();

  const getPostList = async () => {
    const results = await axiosInstance.get("/api/issue");
    console.log(results.data);
    setPostList(results.data);
  };

  const goToPostDetailsPage = (issueId) => {
    console.log(issueId)
    navigation.navigate("PlumberJobDetailsPage", { issueId })
  }

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <ScrollView>
      <Text>Job Listings For You</Text>
      <FlatList
        data={postList}
        renderItem={({ item }) => (
          <Pressable className="flex flex-row py-2" onPress={() => goToPostDetailsPage(item.id)}>
            <Image
              source={{ uri: item.media }}
              resizeMode="cover"
              className="h-32 w-32 rounded"
            />
            <View className="pl-2">
              <Text className="font-bold">{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
}
