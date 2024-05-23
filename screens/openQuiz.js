import React, { useState } from 'react';
import { Platform, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';

const OpenQuiz = ({ navigation, route }) => {
    const { quizId, quizTitle, quizDescription } = route.params;
    const [selectedOption, setSelectedOption] = useState(null);

    const handleFinishQuiz = () => {
        navigation.navigate('Home');
    };

    const handleConfirmAnswer = (correctAnswer) => {
        if (selectedOption === correctAnswer) {
            return styles.correctAnswer;
        } else if (selectedOption !== null) {
            return styles.wrongAnswer;
        }
        return null;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#12082F', '#181D95']}
                        style={styles.background}
                    >
                        <Text style={styles.title}>{quizTitle}</Text>
                        <View style={styles.quizContainer}>
                            <Text style={styles.questionTitle}>Pergunta 1</Text>
                            <Text style={styles.description}>{quizDescription}</Text>
                            <TouchableOpacity
                                style={[styles.answerButton, selectedOption === 'Resposta 1' && handleConfirmAnswer('Resposta 1')]}
                                onPress={() => setSelectedOption('Resposta 1')}
                            >
                                <Text style={styles.textButton}>Resposta 1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.answerButton, selectedOption === 'Resposta 2' && handleConfirmAnswer('Resposta 2')]}
                                onPress={() => setSelectedOption('Resposta 2')}
                            >
                                <Text style={styles.textButton}>Resposta 2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.answerButton, selectedOption === 'Resposta 3' && handleConfirmAnswer('Resposta 3')]}
                                onPress={() => setSelectedOption('Resposta 3')}
                            >
                                <Text style={styles.textButton}>Resposta 3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.answerButton, selectedOption === 'Resposta 4' && handleConfirmAnswer('Resposta 4')]}
                                onPress={() => setSelectedOption('Resposta 4')}
                            >
                                <Text style={styles.textButton}>Resposta 4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nextButton} onPress={handleFinishQuiz}>
                                <Text style={styles.textButton}>Próxima Pergunta</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
            <BottomBar />
        </KeyboardAvoidingView>
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
    title: {
        fontSize: 35,
        color: '#E7DEFF',
        marginVertical: 20
    },
    quizContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        color: '#E7DEFF',
        padding: 40,
        width: 340,
        borderRadius: 39,
        marginBottom: 10,
    },
    questionTitle: {
        color: '#FFFFFF',
        fontSize: 25
    },
    description: {
        color: '#FFFFFF',
        fontSize: 15
    },
    nextButton: {
        backgroundColor: '#E7DEFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
        marginBottom: 70
    },
    answerButton: {
        backgroundColor: '#E7DEFF',
        paddingVertical: 15,
        paddingHorizontal: 45,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
    },
    textButton: {
        color: '#12082F',
        fontSize: 20,
        fontWeight: 'bold',
    },
    correctAnswer: {
        backgroundColor: 'green',
    },
    wrongAnswer: {
        backgroundColor: 'red',
    }
});

export default OpenQuiz;