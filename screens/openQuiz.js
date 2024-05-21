import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';

const OpenQuiz = ({ navigation, route }) => {

    const handleFinishQuiz = () => {
        navigation.navigate('Home')
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
                <Text style={styles.title}>Nome do Quiz</Text>
                <View style={styles.quizContainer}>

                    <Text style={styles.questionTitle}>Pergunta 1</Text>

                    <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum</Text>

                <TouchableOpacity style={styles.answerButton}>
                    <Text style={styles.textButton}>Resposta 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton}>
                    <Text style={styles.textButton}>Resposta 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton}>
                    <Text style={styles.textButton}>Resposta 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton}>
                    <Text style={styles.textButton}>Resposta 4</Text>
                </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.nextButton} onPress={handleFinishQuiz}>
                    <Text style={styles.textButton}>Proxima Pergunta</Text>
                </TouchableOpacity>

            </LinearGradient>
            </View>

            </ScrollView>
                <BottomBar />
        </KeyboardAvoidingView >

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
    }
});

export default OpenQuiz;