import AuthUserDao from "../dao/authUserDao.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import getUserInfo from "../utils/getUserInfo.js";


class AuthUserController {
    async registerUser(req, res) {
        try {
            const { email, password, first_name, last_name,avatar } = req.body;

            // Verificar si el usuario ya está registrado
            const existingUser = await AuthUserDao.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: "El usuario ya está registrado" });
            }

            // Crear un nuevo usuario de autenticación
            const newUser = await AuthUserDao.createUser({ email, password, first_name, last_name, avatar: avatar || '' });
            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);

            res.status(201).json({ message: "Usuario registrado correctamente", user: getUserInfo(newUser), accessToken, refreshToken });
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            res.status(500).json({ error: "Error al registrar el usuario" });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Verificar si el usuario existe
            const user = await AuthUserDao.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            // Verificar la contraseña
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.status(200).json({ message: "Inicio de sesión exitoso", user: getUserInfo(user), accessToken, refreshToken });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).json({ error: "Error al iniciar sesión" });
        }
    }

    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({ error: "No se proporcionó un token de actualización" });
            }

            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await AuthUserDao.getUserByEmail(payload.user.email);

            if (!user) {
                return res.status(403).json({ error: "Token de actualización inválido" });
            }

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (error) {
            console.error("Error al refrescar el token:", error);
            res.status(500).json({ error: "Error al refrescar el token" });
        }
    }

    async logoutUser(req, res) {
        try {
            res.clearCookie('userId');
            res.status(200).json({ message: 'Sesión cerrada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al cerrar sesión' });
        }
    }
}

export default new AuthUserController();
