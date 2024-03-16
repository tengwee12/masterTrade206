import { ScrollView, Text, Image, View } from "react-native";
import { axiosInstance } from "../../services/axios";
import { useEffect, useState } from "react";
import PurpleButton from "../../components/PurpleButton";
import BackButton from "../../components/BackButton";

export default function PlumberJobDetailsPage({ route }) {
  const { issueId } = route.params;
  const [issueData, setIssueData] = useState({});

  const fetchIssueData = async () => {
    try {
      const response = await axiosInstance.get(`/api/issue/${issueId}`);
      console.log(response.data);
      setIssueData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssueData();
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
            <Text>{issueData.description}</Text>
            <View className="flex flex-row my-4">
              <Text className="p-2 bg-inputGray rounded">
                Category: {issueData.category}
              </Text>
              <Text className="p-2 bg-inputGray rounded ml-2">
                Location: {issueData.address}
              </Text>
            </View>
          </View>
        </View>
      )}
      <View className="px-3">
        <PurpleButton text="Offer Quotation" />
        <PurpleButton text="Chat" />
      </View>
    </ScrollView>
  );
}
