/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState, useEffect } from "react";
import userAuth from "../../service/db/usersAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const login = async (credentials) => {
        try {
          // Llama a la función loginUser del servicio userAuth
          const userData = await userAuth.loginUser(credentials);
          setUser(userData.user);
          setIsAuth(true);
          return userData;
        } catch (error) {
          throw new Error("Error al iniciar sesión");
        }
      };


    const logout = async () => {
        try {
            await userAuth.logoutUser();
            setUser(null);
            setIsAuth(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw new Error("Error al cerrar sesión");
        }
    }
    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, login,logout }}>
            {children}
        </AuthContext.Provider>
    )
}

//customHook
export const useAuth = () => useContext(AuthContext)