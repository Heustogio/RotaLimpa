import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RouteScreen = () => {
  const [truckCode, setTruckCode] = useState('');
  const [routeDetails, setRouteDetails] = useState('');

  const handleSubmit = () => {
    // Aqui você normalmente enviaria esses dados para o servidor
    console.log({ truckCode, routeDetails });
    alert(`Route for ${truckCode} updated!`);
    // Pra Limpar campos do formulário
    setTruckCode('');
    setRouteDetails('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar/Atualizar Rota</Text>
      <TextInput
        style={styles.input}
        placeholder="Código do caminhão"
        value={truckCode}
        onChangeText={setTruckCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Detalhes da rota"
        value={routeDetails}
        onChangeText={setRouteDetails}
        multiline
      />
      <Button title="Enviar rota" onPress={handleSubmit} />
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

export default RouteScreen;