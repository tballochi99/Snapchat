import * as ImagePicker from 'expo-image-picker';
import React, {useContext, useEffect} from 'react';
import {Image, Platform, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LogoutButton from '../auth/Logout';
import {ImageContext} from '../context/ImageContext';
import styles from "../style/styles";


export default function ImagePickerExample() {
    const {image, setImage} = useContext(ImageContext);
    const navigation = useNavigation();


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Désolé, nous avons besoin des autorisations de la bibliothèque multimédia pour que cela fonctionne!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let filename = result?.assets[0].uri.substring(
                result?.assets[0].uri.lastIndexOf("/") + 1,
                result?.assets[0].uri.length
            );

            delete result.cancelled;
            result = {
                ...result,
                name: filename,
            };

            setImage(result.assets[0].uri);
            navigation.navigate('UserList');
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 6],
            quality: 1,
        });

        if (!result.canceled) {
            let filename = result?.assets[0].uri.substring(
                result?.assets[0].uri.lastIndexOf("/") + 1,
                result?.assets[0].uri.length
            );

            delete result.cancelled;
            result = {
                ...result,
                name: filename,
            };

            setImage(result.assets[0].uri);
            navigation.navigate('UserList');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Pressable style={[styles.button, styles.photo]} onPress={pickImage}>
                    <Image source={require('../../assets/galerie.png')} style={styles.images}></Image>
                </Pressable>

                <Pressable style={[styles.button, styles.photo]} onPress={takePhoto}>
                    {/*<Text style={styles.text}>Prendre une photo</Text>*/}
                    <Image source={require('../../assets/photo.png')} style={styles.images}></Image>
                </Pressable>
            </View>
            <Pressable style={[styles.button, styles.snap]} onPress={() => navigation.navigate('SnapList')}>
                <Text style={styles.text}>Voir mes snaps</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.snap]} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.text}>Mon Profil</Text>
            </Pressable>
            <LogoutButton navigation={navigation} />
        </View>
    );
}