import React from 'react';
import { Image, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import BottomBar from '../components/BottomBar';

const UserScreen = ({ navigation, route }) => {
    const { userName } = route.params ?? {};

    const handleExit = () => {
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <View>
                <Image source={require('../assets/user.png')} />


                <TouchableOpacity>
                    <Text>Adicionar imagem</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Nome:</Text>
                    <Text>{`${userName || 'Nome do Usuário'}`}</Text>
                    <Text>E-mail:</Text>
                    <Text>{`${userName || 'E-mail do Usuário'}`}</Text>
                </TouchableOpacity>

                <Text onPress={handleExit}>Sair</Text>

            </View>
            <BottomBar />
        </KeyboardAvoidingView>

    );
};

export default UserScreen;