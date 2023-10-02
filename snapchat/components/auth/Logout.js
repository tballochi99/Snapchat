import React, { useContext } from 'react';
import {Button, Pressable, Text} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ImageContext } from '../context/ImageContext';
import styles from "../style/styles";


export default function LogoutButton({ navigation }) {
    const { signOut } = useContext(AuthContext);
    const { setImage } = useContext(ImageContext);

    const handleLogout = () => {
        setImage(null);
        signOut();
        navigation.navigate('Login');
    };

    return (
    <Pressable style={[styles.button, styles.logout]} onPress={handleLogout}>
        <Text style={styles.text}>Se déconnecter</Text>
    </Pressable>
    );
}
