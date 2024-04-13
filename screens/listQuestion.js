import React from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { perguntaList } from '../data/perguntaList';
import { QuestionItem } from '../components/QuestionItem';
import { SeparatorItem } from '../components/SeparatorItem';
import BottomBar from '../components/BottomBar';

const ListQuestion = ({ navigation, route }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <View>
                <Text>Lista de Perguntas</Text>
                <FlatList
                    ItemSeparatorComponent={SeparatorItem}
                    keyExtractor={item => item.titulo}
                    data={perguntaList}
                    renderItem={({ item }) => <QuestionItem {...item} />}
                />
            </View>
            <BottomBar />
        </KeyboardAvoidingView>
    );
};

export default ListQuestion;