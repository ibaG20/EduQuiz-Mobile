import React from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { QuizItem } from "../components/QuizItem";
import { SeparatorItem } from '../components/SeparatorItem';
import { quizList } from '../data/quizList';
import BottomBar from '../components/BottomBar';
import { LinearGradient } from 'expo-linear-gradient';

const ListQuiz = ({ navigation, route }) => {
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
                    keyExtractor={item => item.titulo}
                    data={quizList}
                    renderItem={({ item }) => <QuizItem {...item} />}
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
export default ListQuiz;