import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image, Modal, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// modal de confirmacion de cierre de sesion
const LogoutModal = ({ isVisible, onCancel, onAccept }) => (
  <Modal
    visible={isVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={onCancel}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>¿Estás seguro de que deseas cerrar sesión?</Text>
        <View style={styles.modalButtons}>
          <Button title="Cancelar" onPress={onCancel} />
          <Button title="Aceptar" onPress={onAccept} />
        </View>
      </View>
    </View>
  </Modal>
);

export default function PortadaProductos({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Muestro productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        setError('No se pueden mostrar los productos, por favor intente nuevamente');
      } finally {
        setLoading(false);
      }
    };

    // Obtener el token guardado
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      setToken(storedToken);
    };

    fetchProducts();
    getToken();
  }, []);

  // Carga los productos
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.productCard}
      onPress={() => navigation.navigate('detalleProductos', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  // funcion para cerrar sesion
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('Login');
  };

  // muestra la modal de confirmacion de cierre de sesion
  const showModal = () => {
    setIsModalVisible(true);
  };

  // oculta la modal
  const hideModal = () => {
    setIsModalVisible(false);
  };

  // loading, podria ser una imagen o un custom loading mas elaborado pero para el ejemplo deje solo el texto
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  // mensaje de error que se muestra en caso de que no se puedan cargar los productos (por ejemplo cuando la url de la api no funciona)
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.button]}
        onPress={showModal}
      >
        <Text style={styles.buttonText}>
          {'X'}
        </Text>
      </TouchableOpacity>

      <LogoutModal
        isVisible={isModalVisible}
        onCancel={hideModal}
        onAccept={handleLogout}
      />

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#44a00e',
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 27,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#58ad30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 30,
    height: 30,
    borderRadius: 4,
    textAlign: 'center',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: '#FFF',
  },
});
