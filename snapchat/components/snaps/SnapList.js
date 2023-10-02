import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, Modal, Pressable } from 'react-native';
import { getSnaps, getSnap, setSnapAsSeen, getUserInfo } from '../api/apiConfig';
import styles from "../style/styles";

const SnapList = () => {
    const [snaps, setSnaps] = useState([]);
    const [selectedSnap, setSelectedSnap] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const { token } = useContext(AuthContext);
    const navigation = useNavigation();


    useEffect(() => {
        if (!token) {
            navigation.navigate('Login');
        } else {
            const fetchSnaps = async () => {
                try {
                    const response = await getSnaps(token);
                    const snapsData = response.data;

                    const snapsWithUsernames = await Promise.all(
                        snapsData.map(async (snap) => {
                            const userInfo = await getUserInfo(token, snap.from);
                            const username = userInfo.data.username;
                            return { ...snap, username };
                        })
                    );

                    setSnaps(snapsWithUsernames);
                } catch (error) {
                    console.log('Erreur lors de la récupération des snaps:', error);
                }
            };

            fetchSnaps();
        }
    }, [token]);


    const handleSnapPress = async (snapId) => {
        try {
            const response = await getSnap(token, snapId);
            setSelectedSnap(response.data);
            setModalVisible(true);
            setCountdown(response.data.duration);
            const countdownInterval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
            setTimeout(async () => {
                clearInterval(countdownInterval);
                setModalVisible(false);
                await setSnapAsSeen(token, snapId);
                setSelectedSnap(null);
                const responseSnaps = await getSnaps(token);

                const updatedSnapsData = responseSnaps.data;
                const updatedSnapsWithUsernames = await Promise.all(
                    updatedSnapsData.map(async (snap) => {
                        const userInfo = await getUserInfo(token, snap.from);
                        const username = userInfo.data.username;
                        return { ...snap, username };
                    })
                );

                setSnaps(updatedSnapsWithUsernames);
            }, response.data.duration * 1000);
        } catch (error) {
            console.log('Erreur lors de la récupération du snap:', error);
        }
    };


    const renderItem = ({ item }) => (
        <View style={[styles.view, styles.viewlist]}>
            <Text style={[styles.text, styles.black]}>{item.username}</Text>
            <Pressable style={[styles.button, styles.send]} onPress={() => handleSnapPress(item._id)}>
                <Image source={require('../../assets/see.png')} style={styles.arrow}></Image>
            </Pressable>
        </View>
    );

    return (
        <View style={[styles.container, styles.white]}>
            <Text style={[styles.text, styles.black]}>Liste des snaps :</Text>
            <FlatList
                data={snaps}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                style={styles.list}
            />

            <Modal
                visible={modalVisible}
                transparent={false}
            >
                {selectedSnap && (
                    <View style={styles.modalContainer}>
                        <Image
                            source={{ uri: selectedSnap.image }}
                            style={styles.image}
                        />
                        <Text style={styles.countdown}>{countdown}</Text>
                    </View>
                )}
            </Modal>
        </View>
    );
};

export default SnapList;