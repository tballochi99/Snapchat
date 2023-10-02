import React, { useContext, useState } from 'react';
import {Pressable, Text, TextInput, View, ActivityIndicator, Image} from 'react-native';
import { login } from '../api/apiConfig';
import { AuthContext } from '../context/AuthContext';
import styles from "../style/styles";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signIn } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await login(email, password);
            const token = response.data.data.token;
            const _id = response.data.data._id;
            console.log(token);
            signIn(token, _id);
            navigation.navigate('Camera');
        } catch (error) {
            console.log('Erreur lors de la connexion:', error);
            setError('Email ou mot de passe incorrect(e).');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={[styles.images, styles.icon]}></Image>
                {loading && <ActivityIndicator/>}
                {error && <Text style={{textAlign: 'center', padding: 12, color: 'red'}}>{error}</Text>}
            <View style={styles.formLogin}>
                <TextInput style={styles.input}
                           placeholder="Email"
                           value={email}
                           onChangeText={setEmail}
                />
                <TextInput style={styles.input}
                           placeholder="Mot de passe"
                           secureTextEntry
                           value={password}
                           onChangeText={setPassword}
                />
                <Pressable style={[styles.button, styles.login]} onPress={handleLogin}>
                    <Text style={styles.text}>Se connecter</Text>
                </Pressable>
            </View>
                <Pressable style={[styles.button, styles.signup]} onPress={handleSignup}>
                    <Text style={styles.text}>Inscrivez-vous</Text>
                </Pressable>
        </View>
    );
};

export default Login;


