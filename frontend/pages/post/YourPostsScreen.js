// landing page
import { FlatList, View, Text } from "react-native";
import { useCallback, useState } from "react";
import { axiosInstance } from "../../services/axios";
import { useFocusEffect } from "@react-navigation/native";
import IssueCard from "../../components/IssueCard";
import PurpleButton from "../../components/PurpleButton";

/* by right should retrieve all posts based on user ID */

const YourPostsPage = ({ navigation }) => {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    try {
      const result = await axiosInstance.get("/api/issue");
      console.log("i got issues\n", result.data);
      setIssues(result.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getIssues();
    }, [])
  );

  const goToIssueDetails = (issueId) => {
    navigation.navigate("IssueDetailsScreen", { issueId });
  };

  // FlatList is here to test things only
  // TODO: create an actual styled list that looks decent
  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-32 bg-brandPurple"></View>
      <Logo text="My Posts" />
      <FlatList
        data={issues}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <IssueCard issue={item} onPress={() => goToIssueDetails(item.id)} />
        )}
      />
      <View className="mx-2">
        <PurpleButton
          text="Create New Post"
          onPress={() => navigation.navigate("FindServicesScreen")}
        />
      </View>
    </View>
  );
};

export default YourPostsPage;
