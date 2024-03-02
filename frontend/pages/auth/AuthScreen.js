import { useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput } from "react-native";
import PurpleButton from "../../components/PurpleButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <SafeAreaView>
      <View className="flex flex-col justify-center items-center gap-y-2 p-4">
        <Image
          source={require("../../assets/3d-plumber.png")}
          className="w-24 h-64"
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
        <PurpleButton text="Login" onPress={handleLogin} />
        <Text>Don't have an account? Register</Text>
      </View>
    </SafeAreaView>
  );
}
