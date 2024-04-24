import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

export function QuizItem({ titulo, descricao }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{titulo}</Text>
        <Text numberOfLines={5} style={styles.description}>
          {descricao}
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Abrir</Text>
        </TouchableOpacity>
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
