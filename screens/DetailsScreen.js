import React from 'react';
import { View, Text, Button } from 'react-native';

const QuizDetailsScreen = ({ route, navigation }) => {
  const { quiz } = route.params; // Recebe os dados do quiz da tela anterior

  // Função para navegar para a tela de edição do quiz
  const handleEditQuiz = () => {
    // Implemente a navegação para a tela de edição do quiz
  };

  // Função para excluir o quiz
  const handleDeleteQuiz = () => {
    // Implemente a lógica para excluir o quiz
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{quiz.title}</Text>
      <Text>{quiz.description}</Text>
      {/* Exibe outras informações sobre o quiz, como categoria, nível de dificuldade, etc. */}

      {/* Botões para editar ou excluir o quiz */}
      <Button title="Editar Quiz" onPress={handleEditQuiz} />
      <Button title="Excluir Quiz" onPress={handleDeleteQuiz} />
    </View>
  );
};

export default QuizDetailsScreen;

// Estilos
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};