import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home'; // Importe o arquivo HomeScreen
import CreateQuizScreen from '../screens/createquiz'; // Importe sua tela CreateQuizScreen aqui

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ username: 'Nome do Usuário' }} // Defina o nome de usuário inicial
        />
        <Stack.Screen
          name="Criar quiz"
          component={CreateQuizScreen}
        />
        {/* Adicione as outras telas aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;