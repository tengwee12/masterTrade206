import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import PurpleButton from "../../components/PurpleButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { axiosInstance } from "../../services/axios";
import { setItemAsync } from "expo-secure-store";

export default function UserLoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });
      console.log(response.data)
      await setItemAsync("token", response.data.token);
      await setItemAsync("userId", response.data.userId.toString());
      await setItemAsync("email", email.toString());
      await setItemAsync("isPlumber", "false");                             //0 is to indicate that user is not a plumber
      navigation.navigate("UserTabNavigator");
    } catch (err) {
      setError(err.message);
    }
  };

  const goToUserRegisterPage = () => {
    navigation.navigate("UserRegisterPage");
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
        <Text className="font-bold text-center text-2xl">
          Login to MasterTrade
        </Text>
        <Text className="font-medium text-center">
          Open your door to skilled plumbing solutions: convenience redefined.
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
        <Pressable onPress={goToUserRegisterPage}>
          <Text>
            Don't have an account?{" "}
            <Text className="font-semibold">Register</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
