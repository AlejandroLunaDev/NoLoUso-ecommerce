import React, { createContext, useState, useEffect } from 'react';
import userMongo from '@/service/db/usersMongo'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await userMongo.getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

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
    <UserContext.Provider value={{ user, users, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
