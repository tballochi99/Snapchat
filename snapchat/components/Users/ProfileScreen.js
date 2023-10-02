import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { ImageContext } from '../context/ImageContext';
import { getUserInfo, updateUserInfo, deleteUser } from '../api/apiConfig';
import styles from "../style/styles";
import * as ImageManipulator from 'expo-image-manipulator';

const ProfileScreen = () => {
    const { token, userId, signOut } = useContext(AuthContext);
    const { image, setImage } = useContext(ImageContext);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [newEmail, setNewEmail] = useState(null);
    const [newUsername, setNewUsername] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            if (token && userId) {
                try {
                    const userData = await getUserInfo(token, userId);
                    setUser(userData.data);
                    setUsername(userData.data.username);
                    setEmail(userData.data.email);
                } catch (err) {
                    setError('Failed to load user data');
                }
            }
        })();
    }, [token, userId]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });

            if (!result.cancelled) {
                const imageUri = result.assets[0].uri;
                const manipResult = await ImageManipulator.manipulateAsync(
                    imageUri,
                    [{ resize: { width: 500 } }],
                    { base64: true }
                );

                const profilePictureBase64 = `data:image/jpg;base64,${manipResult.base64}`;
                setImage(profilePictureBase64);
                setImage(profilePictureBase64);
                console.log("Image mise à jour :", profilePictureBase64);

            }
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };

    const deleteAccount = async () => {
        await deleteUser(token);
        signOut();
    };

    const onUpdateUserInfo = async () => {
        const updatedEmail = newEmail === null ? email : newEmail;
        const updatedUsername = newUsername === null ? username : newUsername;
        const updatedPassword = newPassword === null ? '' : newPassword;
        const updatedProfilePicture = image || user.profilePicture;

        try {
            const userData = await updateUserInfo(
                token,
                updatedEmail,
                updatedUsername,
                updatedPassword,
                updatedProfilePicture
            );
            setUser(userData);
            setEmail(updatedEmail);
            setUsername(updatedUsername);
            setPassword(updatedPassword);
        } catch (err) {
            setError('Failed to update user information');
        }
    };

    return (
        <View style={styles.container}>
            {error && <Text>{error}</Text>}
            {user && (
                <>
                    <Text style={styles.title}>Profil de {username}</Text>

                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImagePreview} />
                    ) : user && user.profilePicture ? (
                        <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
                    ) : (
                        <Text>Image de profil non disponible</Text>
                    )}

                    <Pressable style={[styles.button, styles.photo]} onPress={pickImage}>
                        <Text style={styles.text}>Changer photo de profil</Text>
                    </Pressable>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Changer de pseudo :</Text>
                        <TextInput
                            style={styles.input}
                            // value={newUsername || username}
                            placeholder=""
                            onChangeText={setNewUsername}
                        />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Changer de mail :</Text>
                        <TextInput
                            style={styles.input}
                            value={newEmail || email}
                            placeholder=""
                            onChangeText={setNewEmail}
                        />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Nouveau Mot de passe :</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={newPassword || ''}
                            onChangeText={setNewPassword}
                        />
                    </View>

                    <Pressable style={[styles.button, styles.login]} onPress={onUpdateUserInfo}>
                        <Text style={styles.text}>Mettre à jour les informations</Text>
                    </Pressable>

                    <Pressable style={[styles.button, styles.logout]} onPress={deleteAccount}>
                        <Text style={styles.text}>Supprimer le compte</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

export default ProfileScreen;
