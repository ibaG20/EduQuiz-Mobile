import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {


  const handleCreateQuiz = () => {
    // Lógica para navegar para a tela de criação de quiz
    navigation.navigate('Criar quiz');
  };

  // Extrair o nome do usuário dos parâmetros de rota, se estiver disponível
  const { userName } = route.params ?? {};

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#12082F', '#181D95']} // Cores do gradiente (de cima para baixo)
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Listar quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Criar pergunta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Listar pergunta</Text>
          </TouchableOpacity>
        </View>

        {/* Barra na parte inferior */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomBarButton}>
            <Ionicons name="home" size={40} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarButton}>
            <Ionicons name="person" size={40} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>

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
    top: 20, // Distância do topo da tela
    left: 20, // Distância da esquerda da tela
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center', // Centraliza os botões horizontalmente
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#12082F',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;