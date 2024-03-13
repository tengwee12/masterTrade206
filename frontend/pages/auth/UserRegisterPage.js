import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import PurpleButton from "../../components/PurpleButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { axiosInstance } from "../../services/axios";

export default function UserRegisterPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const goToUserLoginPage = () => {
    navigation.navigate("UserLoginPage");
  };

  const handleSignUp = async () => {
    if (
      email.trim().length === 0 ||
      password.trim.length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      setError("Please fill in all the fields");
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }

    try {
      const response = await axiosInstance.post("/api/user/register", {
        email,
        password,
      });
      console.log(response);
      navigation.navigate("UserTabNavigator");
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
          source={require("../../assets/dude-with-phone.png")}
          className="ml-14 h-72"
          resizeMode="contain"
        />
        <Text className="font-bold text-center text-2xl">
          Create an account
        </Text>
        <Text className="font-medium text-center">
          Unveil MasterTrade's plumbing excellence: convenience redefined.
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
        <View className="flex flex-row items-center">
          <MaterialIcons name="lock-outline" size={24} color="black" />
          <TextInput
            className="p-3 border border-slate-300 rounded-lg w-full"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
        </View>
        {error && <Text className="text-red-600">{error}</Text>}
        <PurpleButton text="Sign Up" onPress={handleSignUp} />
        <Pressable onPress={goToUserLoginPage}>
          <Text>
            Already have an account?
            <Text className="font-semibold">Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
