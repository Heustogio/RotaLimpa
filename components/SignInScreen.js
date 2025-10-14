import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from '../components/UserContext'; // Uso correto do Usuário

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser(); // Uso correto do contexto para acessar Usuário

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.34:5000/api/auth/signin', { email, password });
      setLoading(false);
      const { data } = response;
      setUser(data);  // Armazena dados do usuário em contexto

      Alert.alert('Sucesso', 'Logado com Sucesso');
      navigation.navigate('Home', { userId: data.userId, userType: data.userType });
    } catch (error) {
      setLoading(false);
      let errorMessage = 'Falha no login';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Nenhuma resposta recebida';
      }
      Alert.alert('Falha ao logar', errorMessage);
      console.error('Erro ao se cadastrar:', error);
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
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="LOGIN" onPress={handleSignIn} color="#4CAF50" />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  linkText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});

export default SignInScreen;