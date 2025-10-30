import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Importação

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin'); // Tipo de usuário padrão
  const [loading, setLoading] = useState(false); // Onde gerenciar o carregamento

  const handleSignUp = async () => {
    if (!email || !password || !userType) {
      Alert.alert('Erro de validação', 'Por favor, preencha todos os campos e selecione um tipo de usuário');
      return;
    }

    setLoading(true); // Comece a carregar antes da solicitação
    try {
      await axios.post('http://192.168.1.34:5000/api/auth/signup', { email, password, userType });
      setLoading(false); // Finalizar o carregamento após a solicitação ser resolvida
      Alert.alert('Sucesso', 'Conta criada com sucesso', [
        { text: 'OK', onPress: () => navigation.navigate('SignIn') }
      ]);
    } catch (error) {
      setLoading(false); // Terminar o carregamento em caso de erro
      if (error.response) {
        // A solicitação foi feita e o servidor respondeu com um código de status que está fora do intervalo de 2xx
        Alert.alert('Falha ao logar', error.response.data.message || 'Falha ao criar conta');
      } else if (error.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        Alert.alert('Erro de rede', 'Nenhuma resposta recebida');
      } else {
        // Algo aconteceu na configuração da solicitação que acionou um erro
        Alert.alert('Erro', 'Erro durante a configuração da solicitação');
      }
      console.error('Erro de cadastro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Picker
        selectedValue={userType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
      >
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Coletor" value="garbageCollector" />
        <Picker.Item label="Usuário Público" value="publicUser" />
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="ENTRAR" onPress={handleSignUp} color="#4CAF50" />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>Já tem uma conta? Entre</Text>
      </TouchableOpacity>
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
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});

export default SignUpScreen;