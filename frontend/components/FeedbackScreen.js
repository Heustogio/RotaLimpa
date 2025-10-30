import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const FeedbackScreen = () => {
  const [userId, setUserId] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (!userId || !feedback) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    
    try {
      // Atualize esta linha sempre que mudar de wi-fi
      const response = await axios.post('http://192.168.1.34:5000/api/feedback', {
        userId,
        feedback
      });

      // Processando a resposta aqui
      console.log(response.data);
      Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
      // Limpando campos do formulário
      setUserId('');
      setFeedback('');
    } catch (error) {
      console.error(error);
      // Lidando com erros aqui
      Alert.alert('Error', 'Falha ao enviar feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Envie Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Usúario"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Envie Feedback" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  }
});

export default FeedbackScreen;