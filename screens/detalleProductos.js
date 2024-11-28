import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutModal from '../screens/LogoutModal';

export default function DetalleProductos({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.showLogoutModal) {
      setIsModalVisible(true);
      navigation.setParams({ showLogoutModal: false });
    }
  }, [route.params]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al cargar los detalles del producto:", error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  // Función para cerrar sesión
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('Login');
  };

  // Ocultar el modal
  const hideModal = () => {
    setIsModalVisible(false);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles del producto...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LogoutModal
        isVisible={isModalVisible}
        onCancel={hideModal}
        onAccept={handleLogout}
      />

      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>

      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>
          {'Volver'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#58ad30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 100,
    height: 30,
    textAlign: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: '#FFF',
  }
});
