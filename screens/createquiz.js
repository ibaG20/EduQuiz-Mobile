import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questionType, setQuestionType] = useState('Multiple Choice');

  const handleSaveQuiz = () => {
    console.log('Quiz salvo:', { title, description, questionType });
  };

  return (
    <LinearGradient
      colors={['#12082F', '#181D95']}
      style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Criar Quiz</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Picker
          selectedValue={questionType}
          onValueChange={(itemValue) => setQuestionType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Escolha o tipo de pergunta" value="" />
          <Picker.Item label="Multiple Choice" value="Multiple Choice" />
          <Picker.Item label="Verdadeiro/Falso" value="True/False" />
        </Picker>
        <Button title="Salvar quiz" onPress={handleSaveQuiz} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#30237B', // Adicione uma cor de fundo de fallback
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white', // Defina a cor do texto como branco para contrastar com o gradiente
  },
  formContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Adicione uma cor de fundo para os inputs
  },
  picker: {
    height: 40,
    marginBottom: 10,
    color: 'black',
  },
});

export default CreateQuizScreen;