import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { ref, push, set } from 'firebase/database'; // Certifique-se de importar essas funções corretamente
import { database } from '../src/firebase'; // Importe a referência do banco de dados corretamente

const CreateQuestionScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [alternatives, setAlternatives] = useState([{ text: '', isCorrect: false }]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSaveQuestion = () => {
        if(!title || !description){
            setErrorMessage('*Os campos Título e Descrição devem ser preenchidos! Verifique se não esqueceu algum campo.');
        } else if (alternatives.some(alternative => !alternative.text.trim())) {
            setErrorMessage('*Devem ser adicionadas perguntas!');
        } else {
            const questionsRef = ref(database, 'questions');
            const newQuestionRef = push(questionsRef);
            set(newQuestionRef, {
                title,
                description,
                alternatives,
                createdAt: new Date().toISOString() // Adicione a data de criação da pergunta
            }).then(() => {
                console.log('Pergunta salva com sucesso!', { title, description, alternatives });
                navigation.navigate('Listar pergunta');
            }).catch((error) => {
                console.error('Erro ao salvar pergunta:', error);
            });

            setErrorMessage(''); // Limpar a mensagem de erro após salvar com sucesso
        }
    };

    const handleAddAlternative = () => {
        setAlternatives([...alternatives, { text: '', isCorrect: false }]);
    };

    const handleAlternativeChange = (index, text) => {
        const newAlternatives = [...alternatives];
        newAlternatives[index].text = text;
        setAlternatives(newAlternatives);
    };

    const handleToggleCorrectAnswer = (index) => {
        const newAlternatives = [...alternatives];
        newAlternatives[index].isCorrect = !newAlternatives[index].isCorrect;
        setAlternatives(newAlternatives);
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
                    <Text style={styles.title}>Criar Pergunta</Text>
                    <View style={styles.painel}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Título:</Text>
                            <TextInput
                                style={[styles.input, { paddingTop: 5 }]}
                                placeholder="Insira o título da pergunta"
                                value={title}
                                onChangeText={setTitle}
                                textAlignVertical="top"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Descrição:</Text>
                            <TextInput
                                style={[styles.input, { height: 150 }, { paddingTop: 5 }]}
                                placeholder="Descreva sua pergunta"
                                value={description}
                                onChangeText={setDescription}
                                textAlignVertical="top"
                            />
                        </View>
                        {alternatives.map((alternative, index) => (
                            <View key={index}>
                                <Text style={styles.alternativeDescription}>{`Resposta ${index + 1}:`}</Text>
                                <View style={styles.alternativeContainer}>
                                    <TextInput
                                        style={[styles.alternativeInput, { paddingTop: 5 }]}
                                        placeholder="Insira a opção de resposta"
                                        value={alternative.text}
                                        onChangeText={(text) => handleAlternativeChange(index, text)}
                                        textAlignVertical="top"
                                    />
                                    <TouchableOpacity
                                        style={styles.checkboxContainer}
                                        onPress={() => handleToggleCorrectAnswer(index)}
                                    >
                                        <Text style={styles.checkboxDescription}>Correto</Text>
                                        <View style={styles.checkbox}>
                                            {alternative.isCorrect && <Text style={styles.checkmark}>✕</Text>}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                        <TouchableOpacity style={styles.addButton} onPress={handleAddAlternative}>
                            <Text style={styles.addButtonText}>Adicionar Alternativa</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleSaveQuestion} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar pergunta</Text>
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
    painel: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        borderRadius: 39,
        padding: 50,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        height: 50,
        fontSize: 18,
        width: 290,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E7DEFF',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E7DEFF',
    },
    inputLabel: {
        color: '#E7DEFF',
        marginRight: 10,
        fontSize: 20,
    },
    alternativeDescription: {
        color: '#E7DEFF',
        fontSize: 20,
    },
    alternativeInput: {
        height: 75,
        width: 290,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E7DEFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxDescription: {
        color: '#E7DEFF',
        fontSize: 18,
        marginRight: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5, // Border radius for square shape
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 18,
        color: '#ffffff',
    },
    addButton: {
        backgroundColor: '#30237B',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#E7DEFF',
        width: 360,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
    },
    saveButtonText: {
        color: '#12082F',
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottomSpace: {
        height: 75,
    },
    errorText: {
        color: '#fd946b',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 20,
        alignSelf: 'center',
        textAlign: 'center'
    },
});

export default CreateQuestionScreen;



/* import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { ref, push, set } from 'firebase/database'; // Certifique-se de importar essas funções corretamente
import { database } from '../src/firebase'; // Importe a referência do banco de dados corretamente

const CreateQuestionScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [alternatives, setAlternatives] = useState([{ text: '', isCorrect: false }]);

    const handleSaveQuestion = () => {

        if(!title || !description){
            setErrorMessage('*Os campos Título e Descrição devem ser preenchidos! Verifique se não esqueceu algum campo.');
        }else if (alternatives.some(alternative => !alternative.text.trim())) {
            setErrorMessage('*Todas as alternativas devem ser preenchidas! Verifique se não esqueceu algum campo.');
        }else{
            const questionsRef = ref(database, 'questions');
            const newQuestionRef = push(questionsRef);
            set(newQuestionRef, {
                title,
                description,
                alternatives,
                createdAt: new Date().toISOString() // Adicione a data de criação da pergunta
            }).then(() => {
                console.log('Pergunta salva com sucesso!', { title, description, alternatives });
                navigation.navigate('Listar pergunta');
            }).catch((error) => {
                console.error('Erro ao salvar pergunta:', error);
            });

        }

    };

    const handleAddAlternative = () => {
        setAlternatives([...alternatives, { text: '', isCorrect: false }]);
    };

    const handleAlternativeChange = (index, text) => {
        const newAlternatives = [...alternatives];
        newAlternatives[index].text = text;
        setAlternatives(newAlternatives);
    };

    const handleToggleCorrectAnswer = (index) => {
        const newAlternatives = [...alternatives];
        newAlternatives[index].isCorrect = !newAlternatives[index].isCorrect;
        setAlternatives(newAlternatives);
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
                    <Text style={styles.title}>Criar Pergunta</Text>
                    <View style={styles.painel}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Título:</Text>
                            <TextInput
                                style={[styles.input, { paddingTop: 5 }]}
                                placeholder="Insira o título da pergunta"
                                value={title}
                                onChangeText={setTitle}
                                textAlignVertical="top"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Descrição:</Text>
                            <TextInput
                                style={[styles.input, { height: 150 }, { paddingTop: 5 }]}
                                placeholder="Descreva sua pergunta"
                                value={description}
                                onChangeText={setDescription}
                                textAlignVertical="top"
                            />
                        </View>
                        {alternatives.map((alternative, index) => (
                            <View key={index}>
                                <Text style={styles.alternativeDescription}>{`Resposta ${index + 1}:`}</Text>
                                <View style={styles.alternativeContainer}>
                                    <TextInput
                                        style={[styles.alternativeInput, { paddingTop: 5 }]}
                                        placeholder="Insira a opção de resposta"
                                        value={alternative.text}
                                        onChangeText={(text) => handleAlternativeChange(index, text)}
                                        textAlignVertical="top"
                                    />
                                    <TouchableOpacity
                                        style={styles.checkboxContainer}
                                        onPress={() => handleToggleCorrectAnswer(index)}
                                    >
                                        <Text style={styles.checkboxDescription}>Correto</Text>
                                        <View style={styles.checkbox}>
                                            {alternative.isCorrect && <Text style={styles.checkmark}>✕</Text>}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.addButton} onPress={handleAddAlternative}>
                            <Text style={styles.addButtonText}>Adicionar Alternativa</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleSaveQuestion} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar pergunta</Text>
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
    painel: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        borderRadius: 39,
        padding: 50,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        height: 50,
        fontSize: 18,
        width: 290,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E7DEFF',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E7DEFF',
    },
    inputLabel: {
        color: '#E7DEFF',
        marginRight: 10,
        fontSize: 20,
    },
    alternativeDescription: {
        color: '#E7DEFF',
        fontSize: 20,
    },
    alternativeInput: {
        height: 75,
        width: 290,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E7DEFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxDescription: {
        color: '#E7DEFF',
        fontSize: 18,
        marginRight: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5, // Border radius for square shape
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 18,
        color: '#ffffff',
    },
    addButton: {
        backgroundColor: '#30237B',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#E7DEFF',
        width: 360,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
    },
    saveButtonText: {
        color: '#12082F',
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottomSpace: {
        height: 75,
    },
});

export default CreateQuestionScreen; */