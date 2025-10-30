import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import StarRating from './StarRating'; // Importa o componente StarRating

const UpdateFeedbackScreen = ({ route, navigation }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0); // Inicializar classificação como 0
  const [truckId, setTruckId] = useState('');
  const [truckIds, setTruckIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { feedbackId } = route.params;
  const { onGoBack } = route.params;

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      try {
        setLoading(true); // Começa a carregar ao buscar detalhes
        const response = await axios.get(`http://192.168.1.34:5000/api/feedback/getfeedback/${feedbackId}`);
        const data = response.data;
        setFeedback(data.feedback || '');
        setRating(data.rating || 0);
        setTruckId(data.truckId || '');
      } catch (error) {
        console.error('Falha ao buscar detalhes do feedback:', error);
        Alert.alert('Erro', 'Falha ao carregar dados de feedback');
      } finally {
        setLoading(false); // Fim da tela de loanding, seja bem-sucedido ou não
      }
    };

    fetchFeedbackDetails();
  }, [feedbackId]);

  useEffect(() => {
    fetchTruckIds();
  }, []);

  const fetchTruckIds = async () => {
    try {
      const response = await axios.get('http://192.168.1.34:5000/api/routes');
      setTruckIds(response.data.map(truck => truck.truckId));
    } catch (error) {
      console.error('Erro ao buscar IDs de caminhões:', error);
      Alert.alert('Erro', 'Falha ao buscar IDs de caminhão');
    }
  };

  const handleUpdate = async () => {
    if (!feedback || feedback.trim().length === 0 || rating === 0 || !truckId) {
      Alert.alert('Erro', 'Por favor, forneça todos os detalhes necessários');
      return;
    }
  
    // Validate feedback length
    if (feedback.length > 50) {
      Alert.alert('Erro', 'O feedback não pode exceder 50 caracteres');
      return;
    }
  
    try {
      setLoading(true); // Iniciar carregamento ao tentar atualizar
      const response = await axios.put(`http://192.168.1.34:5000/api/feedback/${feedbackId}`, {
        feedback,
        rating,
        truckId
      });
      Alert.alert('Sucesso', 'Feedback atualizado com sucesso!');
      if (onGoBack) onGoBack(); // Chame a função de retorno de chamada antes de retornar
      navigation.goBack(); // Navegar de volta após atualização bem-sucedida
    } catch (error) {
      console.error('Falha ao atualizar o feedback:', error);
      Alert.alert('Erro', 'Falha ao atualizar o feedback');
    } finally {
      setLoading(false); // Fim do loanding, seja bem-sucedido ou não
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atualize Feedback</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Atualize Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <StarRating rating={rating} onRatingPress={setRating} />
      <Picker
        style={styles.input}
        selectedValue={truckId}
        onValueChange={(itemValue) => setTruckId(itemValue)}
      >
        <Picker.Item label="Selecione um caminhão" value="" />
        {truckIds.map((truckId, index) => (
          <Picker.Item key={index} label={truckId} value={truckId} />
        ))}
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Atualize o feedback" onPress={handleUpdate} color="#4CAF50" disabled={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2196F3',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default UpdateFeedbackScreen;