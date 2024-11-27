import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // compruebo si existe token, uso AsyncStorage ya que es una aplicación sencilla y para este mini proyecto es lo mas rápido
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        navigation.navigate('portadaProductos');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Ingresa tu usuario y contraseña.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('authToken', token);

        // muestra portada de productos
        navigation.navigate('portadaProductos');
      }
    } catch (error) {
      setErrorMessage('Credenciales incorrectas o error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Todos los derechos reservados.</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 52,
    borderColor: '#a6a6a6',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 3,
    width: '80%',
  },
  button: {
    height: 60,
    backgroundColor: '#58ad30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: '80%',
    paddingLeft: 8
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: '#FFF',
  },
  errorText: {
    color: '#D73737',
    marginTop: 12,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#134d32',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#FFF',
  },
});
