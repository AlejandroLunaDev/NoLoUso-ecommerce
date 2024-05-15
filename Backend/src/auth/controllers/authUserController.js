import AuthUserDao from "../dao/authUserDao.js";
import bcrypt from "bcrypt";

class AuthUserController {
  async registerUser(req, res) {
    try {
      const { email, password,first_name,last_name } = req.body;

      // Verificar si el usuario ya está registrado
      const existingUser = await AuthUserDao.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "El usuario ya está registrado" });
      }

      // Crear un nuevo usuario de autenticación
      const newUser = await AuthUserDao.createUser({
        email,
        password,
        first_name,
        last_name
        
      });

      res
        .status(201)
        .json({ message: "Usuario registrado correctamente", user: newUser });
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

      // Si la contraseña coincide, enviar una respuesta exitosa
      res.status(200).json({ message: "Inicio de sesión exitoso", user });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }
}

export default new AuthUserController();
