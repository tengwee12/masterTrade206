import { SafeAreaView, Pressable, FlatList, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axios";

export default function PlumberPostsPage() {
  const [postList, setPostList] = useState([]);

  const getPostList = async () => {
    const results = await axiosInstance.get("/api/issue");
    console.log(results.data)
    setPostList(results.data);
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <SafeAreaView>
      <Text>Job Listings For You</Text>
      <FlatList
        data={postList}
        renderItem={({ item }) => (
          <Pressable>
            <Image source={{ uri: item.media }} resizeMode="cover"/>
            <Text>{item.media}</Text>
            <Text>{item.startDate}</Text>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}
