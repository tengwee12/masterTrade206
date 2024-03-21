import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert,
    StatusBar,
} from "react-native";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";
import { database } from "../../services/firebase";
import { getItem } from "expo-secure-store";

const Quotation = ({ otherEmail, quotation, issue }) => {
    const userEmail = getItem("email");
    [quotation, setQuotation] = useState(quotation);
    [issue, setIssue] = useState(issue);
    const [date, setDate] = useState("没有确认日期");

    //TODO : Complete the transaction and confirm date and time
    const handleCompletePress = () => {
        Alert.alert("工作完成");
    };

    useEffect(() => {
        const fetchQuotation = async () => {
            try {
                const isPlumber = getItem("isPlumber");
                const quotationRef = collection(database, "quotations");
                let q, otherUser, currentUser;

                if (isPlumber === "true") {
                    q = query(
                        quotationRef,
                        where("userEmail", "==", otherEmail),
                        where("plumberName", "==", userEmail),
                        where("issue", "==", issue)
                    );
                    otherUser = otherEmail;
                    currentUser = userEmail;
                } else {
                    q = query(
                        quotationRef,
                        where("userEmail", "==", userEmail),
                        where("plumberName", "==", otherEmail),
                        where("issue", "==", issue)
                    );
                    otherUser = userEmail;
                    currentUser = otherEmail;
                }

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    // If quotation exists, set the quotation state
                    const data = querySnapshot.docs[0].data();
                    setQuotation(data.quotation);
                    setDate(data.date);
                } else {
                    if (isPlumber === "true") {
                        Alert.prompt(
                            "Initial Quotation",
                            "输入最初报价 ($)",
                            [
                                {
                                    text: "取消",
                                    style: "cancel",
                                },
                                {
                                    text: "确认",
                                    onPress: async (initialValue) => {
                                        // Check if the input is a valid integer
                                        const intValue = parseInt(initialValue);
                                        if (!isNaN(intValue)) {
                                            // Add initial quotation to the database
                                            await addDoc(quotationRef, {
                                                userEmail: otherUser,
                                                plumberName: currentUser,
                                                quotation: `${initialValue}`,
                                                issue: issue,
                                                createdAt: serverTimestamp(),
                                                updatedAt: serverTimestamp(),
                                            });
                                            // Update the quotation in the component state
                                            setQuotation(initialValue);
                                        } else {
                                            // Inform the user if the input is invalid
                                            Alert.alert("请输入整数值。");
                                        }
                                    },
                                },
                            ],
                            "plain-text", // Specify the input type
                            "50" // Initial value for the input field
                        );
                    } else {
                        // If the user is not a plumber, set the default quotation to $50
                        setQuotation("50");
                    }
                }
            } catch (error) {
                console.error("Error fetching quotation:", error);
            }
        };

        fetchQuotation();
    }, []);

    const handleEditOffer = async () => {
        try {
            const isPlumber = getItem("isPlumber");
            const quotationRef = collection(database, "quotations");
            let q, otherUser, currentUser;

            if (isPlumber === "true") {
                q = query(
                    quotationRef,
                    where("userEmail", "==", otherEmail),
                    where("plumberName", "==", userEmail),
                    where("issue", "==", issue)
                );
                otherUser = otherEmail;
                currentUser = userEmail;
            } else {
                q = query(
                    quotationRef,
                    where("userEmail", "==", userEmail),
                    where("plumberName", "==", otherEmail),
                    where("issue", "==", issue)
                );
                otherUser = userEmail;
                currentUser = otherEmail;
            }

            // Prompt for a new quotation value
            Alert.prompt(
                "更改报价",
                "输入新的报价 ($)",
                [
                    {
                        text: "取消",
                        style: "cancel",
                    },
                    {
                        text: "确认",
                        onPress: async (newValue) => {
                            // Check if the input is a valid integer
                            const intValue = parseInt(newValue);
                            if (!isNaN(intValue)) {
                                const querySnapshot = await getDocs(q);

                                // If no document found, add a new document
                                if (querySnapshot.empty) {
                                    await addDoc(quotationRef, {
                                        userEmail: otherUser,
                                        plumberName: currentUser,
                                        quotation: `${newValue}`,
                                        issue: issue,
                                        updatedAt: serverTimestamp(),
                                    });
                                } else {
                                    // Update existing documents with the new quotation
                                    querySnapshot.forEach(async (doc) => {
                                        await updateDoc(doc.ref, {
                                            quotation: `${newValue}`,
                                            updatedAt: serverTimestamp(),
                                        });
                                    });
                                }

                                // Update the quotation in the component state
                                setQuotation(newValue);

                                // Inform the user that the offer has been updated
                                Alert.alert(
                                    "报价已经更改",
                                );
                            } else {
                                // Inform the user if the input is invalid
                                Alert.alert(
                                  "请输入整数值。"
                                );
                            }
                        },
                    },
                ],
                "plain-text", // Specify the input type
                quotation.replace("$", "") // Initial value for the input field
            );
        } catch (error) {
            console.error("Error updating quotation:", error);
        }
    };

    const handleEditDate = async () => {
        try {
            Alert.prompt(
                "更改日期",
                "输入日期和时间 (YYYY-MM-DD HH:MM)",
                [
                    {
                        text: "取消",
                        style: "cancel",
                    },
                    {
                        text: "确认",
                        onPress: async (newDate) => {
                            if (newDate) {
                                const quotationRef = collection(
                                    database,
                                    "quotations"
                                );
                                const q = query(
                                    quotationRef,
                                    where("userEmail", "==", userEmail),
                                    where("plumberName", "==", otherEmail),
                                    where("issue", "==", issue)
                                );

                                const querySnapshot = await getDocs(q);

                                if (!querySnapshot.empty) {
                                    querySnapshot.forEach(async (doc) => {
                                        await updateDoc(doc.ref, {
                                            userEmail: userEmail,
                                            plumberName: otherEmail,
                                            date: `${newDate}`,
                                            issue: issue,
                                            updatedAt: serverTimestamp(),
                                        });
                                    });
                                    setDate(newDate);

                                    Alert.alert(
                                        "Date Updated",
                                        "时间和日期已更改"
                                    );
                                } else {
                                    Alert.alert(
                                        "报价未找到"
                                    );
                                }
                            }
                        },
                    },
                ],
                "plain-text",
                date // Initial value for the input field
            );
        } catch (error) {
            console.error("Error updating date:", error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <BackButton color="white" />
                <Text className="text-lg font-bold text-white text-center">
                    {otherEmail}
                </Text>
                <View className="flex flex-row items-center justify-between mt-4 w-full">
                    <View className="flex flex-col">
                        <Text style={styles.quotation}>
                            报价: ${quotation}
                        </Text>
                        <Text style={styles.quotation}>日期: {date}</Text>
                    </View>

                    {getItem("isPlumber") === "true" && ( // Conditionally render if user is a plumber
                        <Pressable
                            className="bg-white p-3 rounded flex flex-end"
                            onPress={() => handleEditOffer()}
                        >
                            <Text>更改报价</Text>
                        </Pressable>
                    )}
                    {getItem("isPlumber") === "false" && ( // Conditionally render if user's email matches otherEmail
                        <Pressable
                            className="bg-white p-3 rounded flex flex-end"
                            onPress={() => handleEditDate()}
                        >
                            <Text>更改日期</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#440d88",
        padding: 16,
        paddingTop: StatusBar.currentHeight + 50,
        marginBottom: 16,
    },
    otherEmail: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quotation: {
        fontSize: 16,
        color: "#FFFFFF",
        flex: 1,
        marginRight: 8,
    },
});

export default Quotation;
