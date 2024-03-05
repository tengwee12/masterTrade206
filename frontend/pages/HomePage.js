import { Text, View } from "react-native";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";
import PlumberCard from "../components/PlumberCard";
import { getValueFor } from "../services/secureStore";

export default function HomePage({ navigation }) {
  const [plumberList, setPlumberList] = useState([]);

  const fetchPlumberList = async () => {
    let token = await getValueFor("token");
    console.log("retrieved token", token);

    const result = await axiosInstance.get("/api/plumber/getAllPlumbers", {
      headers: {
        Authorization: token,
      },
    });

    console.log(result.data);
    setPlumberList(result.data);
  };

  useEffect(() => {
    fetchPlumberList();
  }, []);

  return (
    <View>
      <View className="absolute left-0 right-0 top-0 h-24 bg-brandPurple"></View>
      <Logo />
      <Text>Plumbers for you</Text>
      {plumberList.length > 0 &&
        plumberList.map((p) => (
          <PlumberCard
            key={p.id}
            plumberData={p}
          />
        ))}
    </View>
  );
}
