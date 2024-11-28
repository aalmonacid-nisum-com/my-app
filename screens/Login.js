import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        navigation.navigate('portadaProductos');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const validateFields = () => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError('Ingresa tu nombre de usuario.');
      valid = false;
    } else if (username.trim().length < 3) {
      setUsernameError('El nombre de usuario no es válido.');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Ingresa tu contraseña.');
      valid = false;
    } else if (password.trim().length < 6) {
      setPasswordError('La contraseña no es válida.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        await AsyncStorage.setItem('authToken', token);

        navigation.navigate('portadaProductos');
      }
    } catch (error) {
      setPasswordError('Usuario o clave no existe. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, usernameError && styles.inputError]}
          placeholder="Nombre de usuario"
          placeholderTextColor="#888"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (text.trim().length >= 3) setUsernameError('');
          }}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, passwordError && styles.inputError]}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (text.trim().length >= 6) setPasswordError('');
          }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Text>
      </TouchableOpacity>

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
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input: {
    height: 52,
    borderColor: '#a6a6a6',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 3,
    width: '100%',
  },
  inputError: {
    borderColor: '#D73737',
  },
  button: {
    height: 60,
    backgroundColor: '#58ad30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: '80%',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: '#FFF',
  },
  errorText: {
    color: '#D73737',
    fontSize: 14,
    marginTop: 4,
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
