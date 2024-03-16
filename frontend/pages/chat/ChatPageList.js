import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { getItem } from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";

import ChatPage from './ChatPage';

const ChatPageList = ( ) => {
    const [recipientId, setRecipientId] = useState([]);
    const userId = getItem('userId');
    const navigation = useNavigation();
    

    const otherUsers = [
        { id: 1, username: 'user1', fullName: 'User One' },
        { id: 2, username: 'user2', fullName: 'User Two' },
        { id: 3, username: 'user3', fullName: 'User Three' },
        // Add more dummy data as needed
    ];

    useLayoutEffect(() => {
        // const collectionRef = collection(database, 'chats');
        // const q = query(collectionRef, orderBy('createdAt', 'desc'), equalTo());

    });

    const handleUserPress = () => {
        navigation.navigate('ChatPage', {recipientId});
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
            <FlatList
                data={otherUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button
                title="Go to Chat Page"
                onPress={() => navigation.navigate('ChatPage')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
        flex: 1,
        padding: 16,
        },
        item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        },
        username: {
        fontSize: 16,
        fontWeight: 'bold',
        },
        fullName: {
        fontSize: 14,
        },
    });

export default ChatPageList;
