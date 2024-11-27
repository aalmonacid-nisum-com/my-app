import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalContext } from '../context/GlobalContext';
import { ROUTES } from './routes';
import Login from '../screens/Login';
import PortadaProductos from '../screens/portadaProductos';
import DetalleProductos from '../screens/detalleProductos';
import { Image, Text } from 'react-native';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { token } = useContext(GlobalContext);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    if (token) {
      setIsTokenChecked(true);
    } else {
      setIsTokenChecked(true); //en este caso repito setIsTokenChecked(true); para que pueda seguir navegando en la app
    }
  }, [token]);

  if (!isTokenChecked) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={token ? ROUTES.PORTADA_PRODUCTOS : ROUTES.LOGIN}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#58ad30',
          borderBottomWidth: 1.5,
          borderBottomColor: '#044e31'
        },
        headerLeft: () => (
          <Image
            source={require('../assets/logo-white.png')}
            style={{
              width: 80, 
              height: 20,
              marginLeft: 15,
            }}
            resizeMode="contain"
          />
        ),
        headerTitle: (props) => (
          <Text 
            {...props} 
            style={{ 
              fontSize: 18, 
              color: '#FFF',
              fontWeight: 'normal', 
              textAlign: 'center' 
            }}
          />
        ),
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{ title: 'Iniciar sesión' }} />
      <Stack.Screen name={ROUTES.PORTADA_PRODUCTOS} component={PortadaProductos} options={{ title: 'Productos' }} />
      <Stack.Screen name={ROUTES.DETALLE_PRODUCTOS} component={DetalleProductos} options={{ title: 'Detalle del Producto' }} />
    </Stack.Navigator>
  );
}
