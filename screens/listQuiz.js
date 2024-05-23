import React, { useState, useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SeparatorItem } from '../components/SeparatorItem';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { ref, onValue } from 'firebase/database';
import { database } from '../src/firebase';
import QuizItem from "../components/QuizItem"; // Certifique-se de importar corretamente o QuizItem

const ListQuiz = ({ navigation, route }) => {
    const [quizList, setQuizList] = useState([]);

    useEffect(() => {
        const quizzesRef = ref(database, 'quizzes');
        const unsubscribe = onValue(quizzesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const quizzes = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setQuizList(quizzes);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleOpenQuiz = (id) => {
        navigation.navigate('Abrir quiz');
        navigation.navigate('QuizDetail', { quizId: id });
    };

    const renderQuizItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleOpenQuiz(item.id)}>
                <QuizItem title={item.title} description={item.description} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#12082F', '#181D95']}
                style={styles.background}
            >
                <Text style={styles.title}>Lista de Quiz</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        ItemSeparatorComponent={SeparatorItem}
                        keyExtractor={item => item.id}
                        data={quizList}
                        renderItem={renderQuizItem}
                    />
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
        padding: 60,
    },
    title: {
        fontSize: 35,
        color: '#E7DEFF',
        marginVertical: 30,
        alignSelf: 'center',
    },
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30237B',
        color: '#E7DEFF',
        paddingVertical: 0,
        width: 340,
        borderRadius: 8,
        marginBottom: 10,
        marginBottom: 80
    }
});

export default ListQuiz;