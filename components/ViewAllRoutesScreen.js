import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewAllRoutesScreen = () => {
  const [routes, setRoutes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://192.168.1.34:5000/api/routes');
      console.log("API Response:", response.data);
      setRoutes(response.data);
    } catch (error) {
      console.error("Erro ao buscar rotas:", error);
      Alert.alert('Erro', 'Falha ao buscar rotas');
    }
  };

  const deleteRoute = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza de que deseja excluir esta rota?",
      [
        {
          text: "Cancelar",
          style: "cancelar"
        },
        {
          text: "Deletar",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.1.34:5000/api/routes/${id}`);
              fetchRoutes();
            } catch (error) {
              Alert.alert('Erro', 'Falha em deletar sua rota');
              console.log(error);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {routes.map(route => (
        <View key={route._id} style={styles.routeItem}>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>Caminhão ou código: {route.truckId}</Text>
            <Text style={styles.routeDetail}>Iniciar Rota: {route.startDistrict}</Text>
            <Text style={styles.routeDetail}>Finalizar Rota: {route.endDistrict}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateRoute', { routeId: route._id })}
            style={styles.iconContainer}
          >
            <Icon name="Editar" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteRoute(route._id)}
            style={styles.iconContainer}
          >
            <Icon name="Lixo" size={20} color="red" />
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
  routeItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  routeInfo: {
    flex: 1,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  routeDetail: {
    fontSize: 14,
    marginBottom: 2,
  },
  routePoint: {
    fontSize: 14,
    marginLeft: 10,
  },
  iconContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewAllRoutesScreen;