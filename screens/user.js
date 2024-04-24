import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';

const UserScreen = ({ navigation, route }) => {
    const { userName } = route.params ?? {};

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

export default UserScreen;