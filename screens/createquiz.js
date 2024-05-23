import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { ref, onValue, push, set } from 'firebase/database'; // Importar 'push' corretamente
import { database } from '../src/firebase';

const CreateQuizScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const questionsRef = ref(database, 'questions');
        const unsubscribe = onValue(questionsRef, (snapshot) => {
            const data = snapshot.val();
            const questionList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setQuestions(questionList.map(question => question.title)); // Armazenar apenas os títulos das perguntas
        });

        return () => unsubscribe();
    }, []);

    const handleAddQuestion = () => {
        if (selectedQuestion && !selectedQuestions.includes(selectedQuestion)) {
            setSelectedQuestions([...selectedQuestions, selectedQuestion]);
            setSelectedQuestion(''); // Resetar a seleção após adicionar
        }
    };

    const handleSaveQuiz = () => {
        if (!title || !description) {
            setErrorMessage('*Os campos Título e Descrição devem ser preenchidos! Verifique se não esqueceu algum campo.');
        } else if (selectedQuestions.length < 2) {
            setErrorMessage('*Você deve adicionar ao menos duas perguntas no seu quiz! Caso não possua, você pode criá-las na tela "Criar pergunta" disponível no menu.');
        } else {
            setErrorMessage('');

            // Salvar o quiz no Firebase
            const quizzesRef = ref(database, 'quizzes');
            const newQuizRef = push(quizzesRef); // Criar uma nova referência para o quiz
            const newQuiz = {
                title,
                description,
                questions: selectedQuestions,
            };
            set(newQuizRef, newQuiz) // Use 'set' para definir os dados do quiz
                .then(() => {
                    console.log('Quiz salvo:', newQuiz);
                    // Redefinir os estados após salvar
                    setTitle('');
                    setDescription('');
                    setSelectedQuestions([]);
                    setErrorMessage(''); // Limpar a mensagem de erro
                    // Navegar para a tela desejada após salvar, se necessário
                    // navigation.navigate('QuizListScreen'); // Exemplo de navegação
                })
                .catch((error) => {
                    setErrorMessage('*Houve um erro ao salvar o quiz. Tente novamente.');
                    console.error('Erro ao salvar o quiz:', error);
                });
        }
    };

    const renderQuestionsPicker = () => {
        return (
            <View style={styles.pickerContainer}>

                <Picker
                    selectedValue={selectedQuestion}
                    onValueChange={(itemValue) => setSelectedQuestion(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Escolha uma pergunta" value="" />
                    {questions.length > 0 && questions.map((question, index) => (
                        <Picker.Item key={index} label={question} value={question} />
                    ))}
                </Picker>
                <TouchableOpacity onPress={handleAddQuestion} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Adicionar pergunta</Text>
                </TouchableOpacity>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
        );
    };

    const renderSelectedQuestions = () => {
        return (
            <View style={styles.selectedQuestionsContainer}>
                <Text style={styles.selectedQuestionsTitle}>Perguntas selecionadas:</Text>
                <FlatList
                    data={selectedQuestions}
                    renderItem={({ item }) => <Text style={styles.selectedQuestion}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <LinearGradient
                colors={['#12082F', '#181D95']}
                style={styles.container}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Criar Quiz</Text>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Descrição"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />
                        {renderQuestionsPicker()}
                    </View>
                    {renderSelectedQuestions()}
                    <TouchableOpacity onPress={handleSaveQuiz} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar quiz</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomSpace} />
                </View>
            </LinearGradient>
            <BottomBar />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    formContainer: {
        justifyContent: 'center',
        backgroundColor: '#30237B',
        borderRadius: 39,
        padding: 50,
        paddingHorizontal: 10,
        paddingVertical: 30,
        paddingBottom: 0,
        marginBottom: 5,
        marginTop: 10,
        margin: 30,
    },
    input: {
        height: 50,
        width: '75%',
        borderColor: 'gray',
        textAlign: 'top',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 5,
        backgroundColor: '#E7DEFF',
        alignSelf: 'center',
    },
    textArea: {
        height: 100,
    },
    picker: {
        height: 50,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#E7DEFF',
        alignSelf: 'center',
    },
    addButton: {
        backgroundColor: '#12082F',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#E7DEFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    saveButton: {
        backgroundColor: '#E7DEFF',
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
    errorMessage: {
        color: 'red',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    selectedQuestionsContainer: {
        flex: 1,
    },
    selectedQuestionsTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
        alignSelf: 'center',
    },
    selectedQuestion: {
        backgroundColor: '#E7DEFF',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 130,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 5,
    },
    bottomSpace: {
        height: 75,
    },
});

export default CreateQuizScreen;