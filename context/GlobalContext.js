import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

// Crear el proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Token
  const [products, setProducts] = useState([]); // Lista de productos

  return (
    <GlobalContext.Provider value={{ token, setToken, products, setProducts }}>
      {children}
    </GlobalContext.Provider>
  );
};
