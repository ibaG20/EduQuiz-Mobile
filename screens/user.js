import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/firebase';

const UserScreen = ({ navigation, route }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return unsubscribe;
    }, []);

    const handleExit = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#12082F', '#181D95']}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../assets/user.png')} />

                    <TouchableOpacity style={styles.addImage}>
                        <Text style={styles.addImageText}>Adicionar imagem</Text>
                    </TouchableOpacity>

                    <View style={styles.userInfo}>
                        <Text style={styles.title}>E-mail:</Text>
                        <Text style={styles.data}>{user?.email || 'E-mail do Usuário'}</Text>
                    </View>

                    <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                        <Text style={styles.textButton}>Sair</Text>
                    </TouchableOpacity>

                </View>
                <BottomBar />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    addImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        color: '#E7DEFF',
        paddingVertical: 12,
        width: 300,
        borderRadius: 8,
        marginBottom: 10
    },
    addImageText: {
        color: "#E7DEFF"
    },
    userInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        color: '#E7DEFF',
        paddingVertical: 12,
        width: 300,
        borderRadius: 8,
        marginBottom: 10
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#E7DEFF',
        margin: 5
    },
    data: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#E7DEFF'
    },
    exitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        borderRadius: 8,
        paddingVertical: 12,
        width: 300,
        borderRadius: 8,
    },
    textButton:{
        color: '#E7DEFF',
        fontSize: 25
    }
});

export default UserScreen;


/* import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/firebase';

const UserScreen = ({ navigation, route }) => {
    const { userName } = route.params ?? {};

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              console.log(user);
              console.log("oi");
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }, []);

    const handleExit = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#12082F', '#181D95']}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../assets/user.png')} />

                    <TouchableOpacity style={styles.addImage}>
                        <Text style={styles.addImageText}>Adicionar imagem</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addImage}>
                        <Text style={styles.title}>Nome:</Text>
                        <Text style={styles.data}>{`${userName || 'Nome do Usuário'}`}</Text>
                        <Text style={styles.title}>E-mail:</Text>
                        <Text style={styles.data}>{`${userName || 'E-mail do Usuário'}`}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                        <Text style={styles.textButton}>Sair</Text>
                    </TouchableOpacity>

                </View>
                <BottomBar />
            </LinearGradient>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    addImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        color: '#E7DEFF',
        paddingVertical: 12,
        width: 300,
        borderRadius: 8,
        marginBottom: 10
    },
    addImageText: {
        color: "#E7DEFF"
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#E7DEFF',
        margin: 5
    },
    data: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#E7DEFF'
    },
    exitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        borderRadius: 8,
        paddingVertical: 12,
        width: 300,
        borderRadius: 8,
    },
    textButton:{
        color: '#E7DEFF',
        fontSize: 25
    }
});

export default UserScreen; */