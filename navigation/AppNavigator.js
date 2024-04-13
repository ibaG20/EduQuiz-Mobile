import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home'; // Importe o arquivo HomeScreen
import CreateQuizScreen from '../screens/createquiz'; // Importe sua tela CreateQuizScreen aqui
import LoginScreen from '../screens/Login';
import UserScreen from '../screens/user';
import ListQuestion from '../screens/listQuestion';
import ListQuiz from '../screens/listQuiz';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ username: 'Nome do Usuário' }} // Defina o nome de usuário inicial
        />
        <Stack.Screen
          name="Criar quiz"
          component={CreateQuizScreen}
        />
        <Stack.Screen
          name="Listar pergunta"
          component={ListQuestion}
        />
        <Stack.Screen
          name="Listar quiz"
          component={ListQuiz}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
        />
        {/* Adicione as outras telas aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
