import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Pressable, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { signUp } from '../api/apiConfig';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { defaultProfileImageBase64 } from '../common/base64';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profilePicture, setProfilePicture] = useState(defaultProfileImageBase64);

    const handleSignup = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await signUp(email, username, password, profilePicture);
            if (response.data && response.data.data === 'This email is already used') {
                setError('Email déjà utilisé');
                return;
            }
            navigation.navigate('Login');
        } catch (error) {
            console.log("Erreur lors de l'inscription:", error);
            setError('Veuillez remplir les champs correctement.');
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                const base64Image = await convertImageToBase64(imageUri);
                setProfilePicture(base64Image);
            }
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };


    const convertImageToBase64 = async (imageUri) => {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return `data:image/png;base64,${base64}`;
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={[styles.images, styles.icon]} />
            {loading && <ActivityIndicator />}
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: profilePicture }}
                    style={styles.profileImage}
                    resizeMode="contain"
                />
            </View>
            <Pressable style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Choisir une photo de profil</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.signup]} onPress={handleSignup}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 42,
        justifyContent: 'center',
        backgroundColor: '#FFFC00',
    },
    input: {
        marginBottom: 6,
        padding: 6,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: 'white',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 20,
    },
    imageContainer: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    profileImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    button: {
        marginTop: 6,
        marginBottom: 6,
        padding: 6,
        minWidth: 46,
        borderRadius: 100,
        backgroundColor: '#FE2A9C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        textAlign: 'center',
        padding: 12,
        color: 'red',
    },
    images: {
        alignSelf: 'center',
        width: 104,
        height: 104,
    },
    icon: {
        marginBottom: '20%',
    },
});

export default Signup;
