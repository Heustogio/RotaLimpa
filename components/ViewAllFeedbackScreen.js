import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewAllFeedbackScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://192.168.1.34:5000/api/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.log(error);
        alert('Falha ao buscar feedbacks');
      }
    };

    fetchFeedbacks();  // montagem do componente
    const interval = setInterval(fetchFeedbacks, 5000);  // Configurando o intervalo para atualizar a cada 5 segundos

    return () => clearInterval(interval);  // Limpe o intervalo quando o componente for desmontado
  }, []);

  const deleteFeedback = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza de que deseja excluir este feedback?",
      [
        {
          text: "Cancelar",
          style: "cancelar"
        },
        {
          text: "Deletar",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.1.34:5000/api/feedback/${id}`);
              alert("Feedback deletado com sucesso!");
            } catch (error) {
              alert("Falha ao deletar feedback");
              console.log(error);
            }
          }
        }
      ]
    );
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Icon key={i} name="star" size={20} color="#FFD700" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<Icon key={i} name="star-half" size={20} color="#FFD700" />);
      } else {
        stars.push(<Icon key={i} name="star-o" size={20} color="#FFD700" />);
      }
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  return (
    <ScrollView style={styles.container}>
      {feedbacks.map(feedback => (
        <View key={feedback._id} style={styles.feedbackItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.feedbackText}>Truck ID: {feedback.truckId}</Text>
            <Text style={styles.feedbackText}>Feedback: {feedback.feedback}</Text>
            <Text style={styles.feedbackText}>{renderStars(feedback.rating)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('FeedbackAtualizado', { feedbackId: feedback._id })}
            style={styles.icon}
          >
            <Icon name="Editar" size={20} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteFeedback(feedback._id)}
            style={styles.icon}
          >
            <Icon name="Lixo" size={20} color="#dc3545" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10, 
    backgroundColor: '#2196F3',
  },
  feedbackItem: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    padding: 10,
  }
});

export default ViewAllFeedbackScreen;