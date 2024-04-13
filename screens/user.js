import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const UserScreen = ({navigation, route}) => {

    const handleExit = () => {
        navigation.navigate('Login');
    }

    return (
        <View>
            {/* <Image source={require=('../assets/user.png')}/> */}

            <TouchableOpacity>
                <Text>Adicionar imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Nome:</Text>
                <Text>E-mail:</Text>
            </TouchableOpacity>

            <Text onPress={handleExit}>Sair</Text>

        </View>

    );
};

export default UserScreen;