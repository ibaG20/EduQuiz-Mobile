import React from "react";
import { View, StyleSheet, Text } from "react-native";

export function QuestionItem({ title, description }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={5} style={styles.description}>
                    {description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E7DEFF",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#E7DEFF",
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#12082F',
        borderRadius: 8,
        height: 45,
        width: 300,
        margin: 10
    },
    textButton:{
        color: '#E7DEFF',
        fontSize: 20
    },
});