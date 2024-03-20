import { View, Text, FlatList, Pressable } from "react-native";
import PurpleButton from "../components/PurpleButton";
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";
import { useNavigation } from "@react-navigation/native";
import { getItemAsync } from "expo-secure-store";
import IssueCard from "../components/IssueCard";

export default function SelectIssuePage({ route }) {
  const navigation = useNavigation();
  const { otherEmail } = route.params;
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    try {
        const userId = await getItemAsync("userId");

        if (!userId) {
          Alert("No user ID found");
        }
    
        const response = await axiosInstance.get(`/api/issue/getByUser/${userId}`);
        console.log("get issues:", response.data);
        setIssues(response.data);
    } catch (err) {
        console.log(err)
    }
  };

  const navigateToCreatePost = () => {
    navigation.navigate("FindServicesScreen");
  };

  const navigateToChatPage = (issueId) => {
    navigation.navigate("ChatPage", { otherEmail, issue: issueId });
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <BackButton color="white" />
      <Logo text="Select Post" />
      <View className="px-4 py-6">
        <Text className="font-bold">Select Existing Post</Text>
        <FlatList
          data={issues}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <IssueCard
              issue={item}
              onPress={() => navigateToChatPage(item.id)}
            />
          )}
        />
        <Text className="text-center my-5">OR</Text>
        <PurpleButton text="Create New Post" onPress={navigateToCreatePost} />
      </View>
    </View>
  );
}
