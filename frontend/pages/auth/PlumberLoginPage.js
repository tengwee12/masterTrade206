import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import PurpleButton from "../../components/PurpleButton";
import { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { axiosInstance } from "../../services/axios";
import { setItemAsync } from "expo-secure-store";

export default function PlumberLoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/plumber/login", {
        email,
        password,
      })
      await setItemAsync("token", response.data.token);
      navigation.navigate("PlumberTabNavigator")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/tap-left.png")}
        className="absolute left-0 top-8 w-20"
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/tube-right.png")}
        className="absolute right-0 top-44"
        resizeMode="contain"
      />
      <View className="flex flex-col justify-center items-center gap-y-2 p-4">
        <Image
          source={require("../../assets/3d-plumber.png")}
          className="h-72"
          resizeMode="contain"
        />
        <Text className="font-bold text-center text-2xl">Welcome Back</Text>
        <Text className="font-medium text-center">
          Unlock a flood of opportunities! Join our plumbing network and watch
          your business flow to new heights.
        </Text>
        <View className="flex flex-row items-center">
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <TextInput
            className="p-3 border border-slate-300 rounded-lg w-full"
            onChangeText={setEmail}
            value={email}
            autoComplete="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View className="flex flex-row items-center">
          <MaterialIcons name="lock-outline" size={24} color="black" />
          <TextInput
            className="p-3 border border-slate-300 rounded-lg w-full"
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        {error && <Text className="text-red-600">{error}</Text>}
        <PurpleButton text="Login" onPress={handleLogin} />
        <Pressable>
          <Text>
            Don't have an account?{" "}
            <Text className="font-semibold">Register</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
