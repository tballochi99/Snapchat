import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUser } from '../api/apiConfig';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, View, Text, FlatList } from 'react-native';
import { ImageContext } from '../context/ImageContext';
import { sendSnap } from '../api/apiConfig';
import * as ImageManipulator from 'expo-image-manipulator';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from "../style/styles";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext);
    const { image } = useContext(ImageContext);
    const [duration, setDuration] = useState(1);
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setModalVisible(true);
    };

    useEffect(() => {
        if (!token) {
            navigation.navigate('Login');
        } else {
            const fetchUsers = async () => {
                try {
                    const response = await getUser(token);
                    setUsers(response.data.data);
                } catch (error) {
                    console.log('Erreur lors de la récupération des utilisateurs:', error);
                }
            };

            fetchUsers();
        }
    }, [token]);

    const sendImageToUser = async (userId) => {
        if (!userId) {
            console.log('Aucun utilisateur sélectionné.');
            return;
        }
        try {
            const manipResult = await ImageManipulator.manipulateAsync(
                image,
                [{ resize: { width: 500 } }],
                { base64: true }
            );
            const imageBase64 = `data:image/jpeg;base64,${manipResult.base64}`;
            const response = await sendSnap(token, userId, imageBase64, duration);
            // console.log('Image envoyée avec succès.');
            setSuccessMessage('Image envoyée avec succès.');
            setTimeout(() => {
                setModalVisible(false);
                setSuccessMessage(null);
            }, 1000);
        } catch (error) {
            console.log('Erreur lors de l envoi de l image:', error, error.response.data.data);
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.view, styles.viewlist]}>
            <Text style={[styles.text, styles.black]} key={item._id}>{item.username}</Text>
            <Pressable style={[styles.button, styles.send]} onPress={() => openModal(item._id)}>
                <Image source={require('../../assets/arr.png')} style={styles.arrow}></Image>
            </Pressable>
        </View>
    );

    return (
        <View style={[styles.container, styles.white]}>
            <Text style={[styles.text, styles.black]}>Liste des utilisateurs :</Text>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setSuccessMessage(null);
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={[styles.text, styles.black]}>Choisissez la durée :</Text>
                        <Picker style={styles.durations}
                            selectedValue={duration}
                            onValueChange={(itemValue) => setDuration(itemValue)}
                        >
                            {[...Array(10)].map((_, i) => <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />)}
                        </Picker>
                        <Pressable style={styles.button} onPress={() => sendImageToUser(selectedUserId)}>
                            <Text style={[styles.text, styles.black]}>Envoyer l'image</Text>
                        </Pressable>
                        {successMessage && <Text style={[styles.text, styles.black]}>{successMessage}</Text>}
                        <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={[styles.text, styles.cancel]}>Annuler</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default UserList;
