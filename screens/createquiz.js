import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const CreateQuizScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questionType, setQuestionType] = useState('Escolha uma pergunta');
    const [questions, setQuestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Adicionando errorMessage ao estado inicial

    useEffect(() => {
        if (route.params && route.params.question) {
            const { title: questionTitle, description: questionDescription } = route.params.question;
            setQuestions([...questions, { title: questionTitle, description: questionDescription }]);
        }
    }, [route.params]);

    const handleSaveQuiz = () => {
        if (questionType === 'Escolha uma pergunta') {
            setErrorMessage('*Você deve adicionar ao menos uma pergunta no seu quiz! Caso não possua, você pode criá-la na tela "Criar pergunta" disponível no menu.');
        } else {
            setErrorMessage('');
            console.log('Quiz salvo:', { title, description, questionType, questions });
        }
    };

    const renderQuestionsPicker = () => {
        return (
            <View>
                <Picker
                    selectedValue={questionType}
                    onValueChange={(itemValue) => setQuestionType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Escolha uma pergunta" value="Escolha uma pergunta" />
                    {questions.length > 0 && questions.map((question, index) => (
                        <Picker.Item key={index} label={question.title} value={question.title} />
                    ))}
                </Picker>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
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
                            {renderQuestionsPicker()}
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
        fontSize: 40,
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
        backgroundColor: '#E7DEFF',
    },
    descrição: {
        height: 150,
        width: 290,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E7DEFF',
    },
    picker: {
        height: 40,
        marginBottom: 10,
        color: 'black',
        backgroundColor: '#E7DEFF',
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
    },
    bottomSpace: {
        height: 75,
    },
});

export default CreateQuizScreen;
