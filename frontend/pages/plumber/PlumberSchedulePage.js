import { View, Text, FlatList, Pressable, Image } from "react-native";
import Logo from "../../components/Logo";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axios";
import { getItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

function formatDateTime(dateTimeString) {
    const date = formatDate(dateTimeString);
    const startTime = formatTime(dateTimeString);
    const endTime = formatTime(
        new Date(new Date(dateTimeString).getTime() + 60000)
    ); // Add one minute for end time
    return `${date} ${startTime} - ${endTime}`;
}

export default function PlumberSchedulePage() {
    const navigation = useNavigation();
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const plumberId = await getItemAsync("plumberId");
            if (!plumberId) {
                Alert("No plumber ID found");
            }

            const response = await axiosInstance.get(
                `/api/transaction/getByPlumber/${plumberId}`
            );
            console.log(response.data);
            setTransactions(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const navigateToIssuePage = (issueId) => {
        navigation.navigate("PlumberJobDetailsPage", { issueId });
    };

    return (
        <View>
            <View className="absolute left-0 right-0 top-0 h-32 bg-brandPurple"></View>
            <Logo text="我的时间表" />
            <FlatList
                data={transactions}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <Pressable
                        className="bg-white rounded-lg shadow-md m-2 p-4"
                        onPress={() => navigateToIssuePage(item.id)}
                    >
                        <Image
                            source={{ uri: item.media }}
                            className="h-32 w-full rounded"
                            resizeMode="cover"
                        />
                        <Text className="font-bold text-lg">{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text className="mt-3">地址: {item.address}</Text>
                        <Text>
                            预约日期:{" "}
                            {formatDateTime(item.meetingDate)}
                        </Text>
                        <Text>报价: ${item.quotation}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}
