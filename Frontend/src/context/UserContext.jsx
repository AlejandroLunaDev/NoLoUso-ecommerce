import React, { createContext, useState } from 'react';
import userMongo from '../service/db/usersMongo'; // Importa el archivo userMongo.js que contiene las funciones de manejo de usuarios

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const userData = await userMongo.loginUser(credentials);
      setUser(userData.user);
      return userData;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesión');
    }
  };

  const logout = async () => {
    try {
      const response = await userMongo.logoutUser();
      setUser(null);
      return response;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw new Error('Error al cerrar sesión');
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
