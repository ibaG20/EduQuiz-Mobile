import React from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { QuizItem } from "../components/QuizItem";
import { SeparatorItem } from '../components/SeparatorItem';
import { quizList } from '../data/quizList';
import BottomBar from '../components/BottomBar';

const ListQuiz = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <View>
                <Text>Lista de Quiz</Text>
                <FlatList
                    ItemSeparatorComponent={SeparatorItem}
                    keyExtractor={item => item.titulo}
                    data={quizList}
                    renderItem={({ item }) => <QuizItem {...item} />}
                />
            </View>
            <BottomBar />
        </KeyboardAvoidingView>

    );
};

export default ListQuiz;