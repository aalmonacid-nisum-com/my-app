import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalContext } from '../context/GlobalContext';
import { ROUTES } from './routes';
import Login from '../screens/Login';
import PortadaProductos from '../screens/portadaProductos';
import DetalleProductos from '../screens/detalleProductos';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

// boton cerrar sesion
const LogoutButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.logoutButton}
  >
    <Text style={styles.logoutText}>X</Text>
  </TouchableOpacity>
);

export default function AppNavigator() {
  const { token } = useContext(GlobalContext);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    setIsTokenChecked(true);
  }, [token]);

  if (!isTokenChecked) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={token ? ROUTES.PORTADA_PRODUCTOS : ROUTES.LOGIN}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerStyle,
        headerLeft: () => (
          <Image
            source={require('../assets/logo-white.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        ),
        headerTitle: (props) => (
          <Text {...props} style={styles.headerTitle} />
        ),
        headerTintColor: '#000',
      }}
    >
      {/* Pantalla de inicio de sesión */}
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{ title: 'Iniciar sesión' }} />

      {/* Pantalla principal de productos */}
      <Stack.Screen 
        name={ROUTES.PORTADA_PRODUCTOS} 
        component={PortadaProductos} 
        options={({ navigation }) => ({
          title: 'Productos',
          headerRight: () => (
            <LogoutButton onPress={() => navigation.setParams({ showLogoutModal: true })} />
          ),
        })}
      />

      {/* Detalle del producto */}
      <Stack.Screen 
        name={ROUTES.DETALLE_PRODUCTOS} 
        component={DetalleProductos} 
        options={({ navigation }) => ({
          title: 'Detalle del Producto',
          headerRight: () => (
            <LogoutButton onPress={() => navigation.setParams({ showLogoutModal: true })} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#58ad30',
    borderBottomWidth: 1.5,
    borderBottomColor: '#044e31',
  },
  logo: {
    width: 90,
    height: 40,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  logoutButton: {
    marginRight: 10,
    padding: 8,
    backgroundColor: '#134d32',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
