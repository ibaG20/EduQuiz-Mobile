import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import { auth } from '../src/firebase';

const LoginScreen = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('');

    function handleSignIn() {
        if (email === '' || password === '') {
            alert("Preencha os campos");
            return;
        }
    
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigation.replace('Home');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage);
            });
    }
    

    function handleGoToCreateAccount() {
        navigation.navigate('Criar conta')
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#12082F', '#181D95']}
                style={styles.background}
            >
                <Text style={styles.titleContainer}>Edu Quiz</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.titleForm}>Login</Text>

                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder='exemplo@email.com'
                    />
                    <Text style={styles.text}>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassord}
                        value={password}
                        placeholder='digite sua senha'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.createAccount} onPress={handleGoToCreateAccount}>Criar conta</Text>
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
    titleContainer: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#D0C0FF',
        bottom: 50
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        color: '#E7DEFF',
        paddingVertical: 40,
        width: 340,
        borderRadius: 39,
        marginBottom: 10,
    },
    titleForm: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#D0C0FF',
        marginBottom: 20
    },
    text: {
        color: '#E7DEFF',
        fontSize: 18,
        textAlign: 'left',
        width: '98%', // Define a largura total para garantir o alinhamento
        paddingHorizontal: 20, // Espaçamento entre o texto e o input
        marginBottom: 5, // Espaçamento abaixo do texto
    },
    input: {
        height: 50,
        width: 290,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E7DEFF',
        color: '#30237B'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#12082F',
        borderRadius: 8,
        height: 50,
        width: 290,
        margin: 10
    },
    textButton: {
        color: '#E7DEFF',
        fontSize: 20
    },
    createAccount: {
        fontSize: 15,
        color: '#E7DEFF',
        marginTop: 10
    }
})

export default LoginScreen;

