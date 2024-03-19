import {
  FlatList,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axios";
import { useNavigation } from "@react-navigation/native";
import IssueCard from "../../components/IssueCard";

/* To do: change to filter by date range */

export default function PlumberPostsPage() {
  const [postList, setPostList] = useState([]);
  const navigation = useNavigation();

  const getPostList = async () => {
    const results = await axiosInstance.get("/api/issue");
    console.log(results.data);
    setPostList(results.data);
  };

  const goToPostDetailsPage = (issue) => {
    navigation.navigate("PlumberJobDetailsPage", { issueId: issue.id });
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <Logo text="Job Listings"/>
      <FlatList
        data={postList}
        renderItem={({ item }) => (
        <IssueCard issue={item} onPress={() => goToPostDetailsPage(item)}/>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
