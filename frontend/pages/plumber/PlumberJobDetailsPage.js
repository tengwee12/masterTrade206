import { ScrollView, Text, Image, View } from "react-native";
import { useEffect, useState } from "react";
import PurpleButton from "../../components/PurpleButton";
import BackButton from "../../components/BackButton";
import { fetchIssueData } from "../../services/issue";
import { useNavigation } from "@react-navigation/native";
import { axiosInstance } from "../../services/axios";

export default function PlumberJobDetailsPage({ route }) {
  const { issueId } = route.params;
  const [issueData, setIssueData] = useState({});
  const navigation = useNavigation();

  const navigateToChatPage = async () => {
    try {
      console.log(issueData);
      if (issueData && issueData.UserId) {
        const Uid = issueData.UserId;
        const emailResponse = await axiosInstance.get(
          `/api/user/getemail/${Uid}`
        );
        const otherId = emailResponse.data;
        navigation.navigate("ChatPage", {
          otherEmail: otherId,
          issue: issueData.id,
        });
      } else {
        console.log("Issue data or UserId is missing.");
      }
    } catch (error) {
      console.error("Error navigating to ChatPage:", error);
    }
  };

  const fetchIssue = async () => {
    try {
      const response = await fetchIssueData(issueId);
      setIssueData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, []);

  return (
    <ScrollView>
      {issueData && (
        <View>
          <Image
            source={{ uri: issueData.media }}
            className="w-screen h-64"
            resizeMode="cover"
          />
          <BackButton color="white" />
          <View className="px-3">
            <Text className="font-bold text-lg py-2">{issueData.title}</Text>
            <View className="flex flex-row mb-2">
              <Text className="p-2 bg-inputGray rounded">
                种类: {issueData.category}
              </Text>
              <Text className="p-2 bg-inputGray rounded ml-2">
                地址: {issueData.address}
              </Text>
            </View>
            <Text>{issueData.description}</Text>
            <Text className="mt-5">可用日期: 2024-05-10, 16:00 - 17:00</Text>
          </View>
        </View>
      )}
      <View className="px-3">
        <PurpleButton
          text="开始对话"
          onPress={() => navigateToChatPage(issueData)}
        />
      </View>
    </ScrollView>
  );
}
