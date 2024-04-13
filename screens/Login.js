import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';

const LoginScreen = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('');

    function handleSignIn(){
        if(email === '' || password === ''){
           alert("Preencha os campos");
           return;
        }
        // Aqui você pode adicionar verificações de autenticação mais complexas
        navigation.replace('Home');  // Usa 'replace' para evitar que o usuário volte à tela de login
    }

    return (
        <View>
            <Text>Edu Quiz</Text>

            <TextInput
                //style
                onChangeText={setEmail}
                value={email}
                placeholder='exemplo@email.com'
            />
            <TextInput
                onChangeText={setPassord}
                value={password}
                placeholder='digite sua senha'
                secureTextEntry={true}
            />

            <TouchableOpacity onPress={handleSignIn}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;


