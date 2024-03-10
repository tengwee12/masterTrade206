import { Text, View } from "react-native";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";
import PlumberCard from "../components/PlumberCard";
import { getValueFor } from "../services/secureStore";

export default function HomePage({ navigation }) {
  const [plumberList, setPlumberList] = useState([]);

  const fetchPlumberList = async () => {
    try {
      let token = await getValueFor("token");
      console.log("retrieved token", token);
      console.log("fetch plumbers")

      const result = await axiosInstance.get("/api/plumber/getAllPlumbers", {
        headers: {
          Authorization: "INSERT TOKEN HERE",
        },
      });

      console.log(result.data);
      setPlumberList(result.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchPlumberList();
  }, []);

  return (
    <SafeAreaView>
        <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
        <Logo />
        <PurpleButton text="Reset Navigation" onPress={handleResetNavigation} />

        <PlumberProfile />
    </SafeAreaView>
  );
}
