import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { getItem } from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";

const ChatPageList = ( ) => {
    const [recipientId, setRecipientId] = useState([]);
    const userId = getItem('userId');
    const navigation = useNavigation();

    useLayoutEffect(() => {
        // const collectionRef = collection(database, 'chats');
        // const q = query(collectionRef, orderBy('createdAt', 'desc'), equalTo());

    });

    const handleUserPress = () => {
        navigation.navigate('ChatPage', {otherId : 1});
    };

    // Render item function for FlatList
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={handleUserPress}>
        <View style={styles.item}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.fullName}>{item.fullName}</Text>
        </View>
        </TouchableOpacity>
    );

    return (
        <View>
            {/* <FlatList
                data={otherUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            /> */}
            <Button
                title="Go to Chat Page"
                onPress={handleUserPress}
            />
        </View>
    );
};

export default ChatPageList;
