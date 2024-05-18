/* eslint-disable react-hooks/exhaustive-deps */
// AuthProvider.js
import React, { useContext, createContext, useState, useEffect, useCallback } from "react";
import userAuth from "../../service/db/usersAuth";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedAccessToken = localStorage.getItem('accessToken');
    
    const [isAuth, setIsAuth] = useState(!!storedRefreshToken);
    const [user, setUser] = useState(initialUser);
    const [accessToken, setAccessToken] = useState(storedAccessToken);
    const [refreshToken, setRefreshToken] = useState(storedRefreshToken);
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const initializeAuth = async () => {
            if (refreshToken) {
                try {
                    const newAccessToken = await userAuth.refreshAccessToken(refreshToken);
                    setAccessToken(newAccessToken);
                    localStorage.setItem('accessToken', newAccessToken);
                    setIsAuth(true);
                    await fetchUsersList(newAccessToken);
                } catch (error) {
                    console.error("Error al refrescar el token:", error);
                    logout();
                }
            }
        };

        initializeAuth();
    }, [refreshToken]);

  
    

    const login = async (credentials) => {
        try {
            const userData = await userAuth.loginUser(credentials);

            if (userData && userData.accessToken && userData.refreshToken) {
                setUser(userData.user);
                setIsAuth(true);
                setAccessToken(userData.accessToken);
                setRefreshToken(userData.refreshToken);
                localStorage.setItem('refreshToken', userData.refreshToken);
         /*        localStorage.setItem('accessToken', userData.accessToken); */
                localStorage.setItem('user', JSON.stringify(userData.user));
                await userAuth.updateUser(userData.user._id,{online:true})

                await fetchUsersList(userData.accessToken);
            } else {
                throw new Error("Datos de autenticación inválidos");
            }

            return userData;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw new Error("Error al iniciar sesión");
        }
    };

    const logout = async () => {
        try {

            if (user && user._id) {
                await userAuth.updateUser(user._id, { online: false });
            }
            await userAuth.logoutUser();
        
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            sessionStorage.removeItem('refreshToken');
            setUser(null);
            setIsAuth(false);
            setAccessToken(null);
            setRefreshToken(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw new Error("Error al cerrar sesión");
        }
    };

    const fetchUsersList = useCallback(async (token) => {
        try {
            const users = await userAuth.getAllUsers(token || accessToken);
            setUsersList(users);
        } catch (error) {
            console.error("Error al obtener la lista de usuarios:", error);
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, login, logout, accessToken, refreshToken, usersList, setUsersList, fetchUsersList }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
