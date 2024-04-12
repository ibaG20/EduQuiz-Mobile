import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import BottomBar from '../components/BottomBar';

const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questionType, setQuestionType] = useState('Verdadeiro/Falso');
  const [alternatives, setAlternatives] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSaveQuiz = () => {
    console.log('Quiz salvo:', { title, description, questionType, alternatives, correctAnswer });
  };

  const handleAddAlternative = () => {
    setAlternatives([...alternatives, '']);
  };

  const handleAlternativeChange = (index, text) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = text;
    setAlternatives(newAlternatives);
  };

  const renderAlternatives = () => {
    return alternatives.map((alternative, index) => (
      <TextInput
        key={index}
        style={styles.alternativeInput}
        placeholder={`Alternativa ${index + 1}`}
        value={alternative}
        onChangeText={(text) => handleAlternativeChange(index, text)}
      />
    ));
  };

  const renderCorrectAnswerPicker = () => {
    return (
      <Picker
        selectedValue={correctAnswer}
        onValueChange={(itemValue) => setCorrectAnswer(itemValue)}
        style={styles.correctAnswerPicker}
      >
        <Picker.Item label="Selecione a resposta correta" value="" />
        {alternatives.map((alternative, index) => (
          <Picker.Item key={index} label={`Alternativa ${index + 1}`} value={index} />
        ))}
      </Picker>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={['#12082F', '#181D95']}
          style={styles.container}
        >
          <Text style={styles.title}>Criar Quiz</Text>
          <View style={styles.painel}>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.titulo}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.descrição}
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
                <Picker.Item label="Verdadeiro/Falso" value="Verdadeiro/Falso" />
                <Picker.Item label="Multipla Escolha" value="Multipla Escolha" />
              </Picker>
              <Text style={styles.alternativesLabel}>Alternativas:</Text>
              {renderAlternatives()}
              <TouchableOpacity style={styles.addButton} onPress={handleAddAlternative}>
                <Text style={styles.addButtonText}>Adicionar Alternativa</Text>
              </TouchableOpacity>
              {(questionType === 'Verdadeiro/Falso' || questionType === 'Multipla Escolha') && renderCorrectAnswerPicker()}
            </View>
          </View>
          <TouchableOpacity onPress={handleSaveQuiz} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar quiz</Text>
          </TouchableOpacity>
          <View style={styles.bottomSpace} />
        </LinearGradient>
      </ScrollView>
      <BottomBar />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#30237B',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  formContainer: {
    flex: 1,
  },
  titulo: {
    height: 50,
    width: 290,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  descrição: {
    height: 150,
    width: 290,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  picker: {
    height: 40,
    marginBottom: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  painel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30237B',
    borderRadius: 39,
    padding: 50,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#12082F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alternativesLabel: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  alternativeInput: {
    height: 40,
    width: 290,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#12082F',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  correctAnswerPicker: {
    height: 40,
    marginBottom: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  bottomSpace: {
    height: 75,
  },
});

export default CreateQuizScreen;
