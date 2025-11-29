import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext';
import { Picker } from '@react-native-picker/picker';

const AddRouteScreen = ({ navigation }) => {
    const [truckId, setTruckId] = useState('');
    const [startDistrict, setStartDistrict] = useState('');
    const [endDistrict, setEndDistrict] = useState('');
    const { user } = useUser();
    const [routePoints, setRoutePoints] = useState([]);
  
    const routePointsData = {
        Anapolis_Centro: [
            { latitude: -16.3285, longitude: -48.9534 },
        ],
        Recanto_do_Sol: [
            { latitude: -16.2803, longitude: -48.9311 },
        ],
        Jundiai: [
            { latitude: -16.3306, longitude: -48.9485 },
        ],
        Vila_Santana: [
            { latitude: -16.3337, longitude: -48.9519 },
        ],
        Bairro_Industrial: [
            { latitude: -16.3150, longitude: -49.0000 },
        ],
        Aterro_Sanitario: [
            { latitude: -16.3500, longitude: -48.9800 },
        ],
    };    
  
    const setRoutePointsByDistricts = (start, end) => {
      const startPoints = routePointsData[start] || [];
      const endPoints = routePointsData[end] || [];
      setRoutePoints([...startPoints, ...endPoints]);
    };
  
    const handleAddRoute = async () => {
        try {
          if (!startDistrict || !endDistrict) {
            throw new Error('Selecione as rotas inicial e final.');
          }
      
          if (!routePoints.length) {
            throw new Error('Pontos de rota não encontrados para os distritos de início e fim selecionados');
          }
      
          // Validando Caminhão de onibus
          const truckIdRegex = /^[A-Z0-9]{6}$/; // Exemplo de como deve ser o formato dos numeros
          if (!truckIdRegex.test(truckId)) {
            throw new Error('O ID do caminhão deve ter seis caracteres numéricos..');
          }
      
          await axios.post('http://192.168.1.34:5000/api/routes', { 
            truckId, 
            startDistrict,
            endDistrict,
            userId: user.userId,
            routePoints
          });
          navigation.goBack();
        } catch (error) {
          console.error(error);
          Alert.alert('Error', `Failed to add route: ${error.response?.data?.message || error.message}`);
        }
      };      
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={truckId}
          onChangeText={setTruckId}
          placeholder="Escolha esse caminhão"
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={startDistrict}
            onValueChange={(itemValue) => {
              setStartDistrict(itemValue);
              setRoutePoints([]);
              setRoutePointsByDistricts(itemValue, endDistrict);
            }}
            mode="dropdown"
          >
            {Object.keys(routePointsData).map(city => (
                <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={endDistrict}
            onValueChange={(itemValue) => {
              setEndDistrict(itemValue);
              setRoutePoints([]);
              setRoutePointsByDistricts(startDistrict, itemValue);
            }}
            mode="dropdown"
          >
            {Object.keys(routePointsData).map(city => (
                <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
        <Button title="Adicionar Rota" onPress={handleAddRoute} color="#4CAF50"/>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  }
});

export default AddRouteScreen;