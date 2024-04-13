import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomBar from '../components/BottomBar';

const HomeScreen = ({ navigation, route }) => {
  const handleCreateQuiz = () => {
    navigation.navigate('Criar quiz');
  };
  const handleListQuestion = () => {
    navigation.navigate('Listar pergunta');
  };
  const handleListQuiz = () => {
    navigation.navigate('Listar quiz');
  };

  // Extrair o nome do usuário dos parâmetros de rota, se estiver disponível
  const { userName } = route.params ?? {};

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#12082F', '#181D95']} 
        style={styles.background}
      >

        {/* Mensagem de boas-vindas */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>{`Olá, ${userName || 'Usuário'}!`}</Text>
        </View>

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCreateQuiz}>
            <Text style={styles.buttonText}>Criar quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleListQuiz}>
            <Text style={styles.buttonText}>Listar quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Criar pergunta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleListQuestion}>
            <Text style={styles.buttonText}>Listar pergunta</Text>
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
  welcomeContainer: {
    position: 'absolute',
    top: 20, 
    left: 20, 
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#30237B',
    paddingVertical: 40,
    width: 340,
    borderRadius: 39,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default HomeScreen;