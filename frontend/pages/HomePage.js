import { Text, View, TextInput, ScrollView, Image } from "react-native";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";
import PlumberCard from "../components/PlumberCard";
import { getValueFor, save } from "../services/secureStore";

export default function HomePage() {
  const [plumberList, setPlumberList] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  const fetchPlumberList = async () => {
    try {
      await save("token", "IAMTOKEN");
      const token = await getValueFor("token");
      console.log("retrieved token", token);

      const result = await axiosInstance.get("/api/plumber/getAllPlumbers", {
        headers: {
          Authorization: token,
        },
      });

      console.log(result.data);
      setPlumberList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlumberList();
  }, []);

  return (
    <ScrollView>
      <View className="absolute left-0 right-0 top-0 h-32 bg-brandPurple"></View>
      <Logo />
      <TextInput
        className="bg-white m-3 p-4 rounded"
        onChangeText={setSearchBar}
        value={searchBar}
        placeholder="Search"
      />
      <View className="p-3">
        <ScrollView horizontal>
          <View className="pr-3">
            <Image
              source={require("../assets/adv-1.png")}
              className="rounded"
            />
            <Text>Adv・P Plumbers</Text>
          </View>
          <View>
            <Image
              source={require("../assets/adv-1.png")}
              className="rounded"
            />
            <Text>Adv・P Plumbers</Text>
          </View>
        </ScrollView>
        <Text className="font-bold text-base pt-4">Plumbers for you</Text>
        <ScrollView>
          {plumberList.length > 0 &&
            plumberList.map((p) => <PlumberCard key={p.id} plumberData={p} />)}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
