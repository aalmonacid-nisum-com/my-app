import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './context/GlobalContext'; 
import AppNavigator from './navigation/AppNavigator'; //

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GlobalProvider>
  );
}