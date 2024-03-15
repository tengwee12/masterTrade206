import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import PlumberCard from "../components/PlumberCard";
import { useNavigation } from "@react-navigation/native";
import { fetchPlumbers } from "../services/plumber";
import { getItemAsync } from "expo-secure-store";

export default function HomePage() {
  const [plumberList, setPlumberList] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const navigation = useNavigation();

  const fetchPlumberList = async () => {
    try {
      const token = await getItemAsync("token");
      console.log("retrieved token", token);
      const result = await fetchPlumbers(token);
      console.log(result);
      setPlumberList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    navigation.navigate("Filter", { searchBar, plumberList });
  };

  useEffect(() => {
    fetchPlumberList();
  }, []);

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-32 bg-brandPurple"></View>
      <Logo />
      <TextInput
        className="bg-white m-3 p-4 rounded"
        onChangeText={setSearchBar}
        value={searchBar}
        placeholder="Search"
        onSubmitEditing={handleSearch}
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
        <ScrollView horizontal>
          {plumberList &&
            plumberList.map((p) => <PlumberCard key={p.id} plumberData={p} />)}
        </ScrollView>
      </View>
    </View>
  );
}
