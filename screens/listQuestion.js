import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../src/firebase';
import { QuestionItem } from '../components/QuestionItem'; // Named import
import { SeparatorItem } from '../components/SeparatorItem';
import BottomBar from '../components/BottomBar'; // Default import
import { LinearGradient } from 'expo-linear-gradient';

const ListQuestion = ({ navigation, route }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const questionsRef = ref(database, 'questions');
        const unsubscribe = onValue(questionsRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Dados do Firebase:', data);
            const questionList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setQuestions(questionList);
            console.log('Perguntas armazenadas no estado:', questionList);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#12082F', '#181D95']}
                style={styles.background}
            >
                <Text style={styles.title}>Lista de Perguntas</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        ItemSeparatorComponent={SeparatorItem}
                        data={questions}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            if (!item.alternatives) {
                                console.error(`Pergunta sem alternativas: ${item.title}`);
                                return null;
                            }
                            return <QuestionItem {...item} />;
                        }}
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
        marginVertical: 30
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
})

export default ListQuestion;