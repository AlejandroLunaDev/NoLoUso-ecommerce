import userDao from '../dao/userDao.js';

class UserController {
    async registerUser(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body;
            console.log('Datos recibidos:', req.body); // Log de los datos recibidos
            
            const newUser = await userDao.createUser({ first_name, last_name, email, password });
            console.log('Usuario creado:', newUser); // Log del usuario creado
    
            res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
        } catch (error) {
            console.error('Error al registrar usuario:', error); // Log del error
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
    }
    
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userDao.getUserByEmail(email);
            if (user && user.password === password) {
                res.cookie('userId', user._id,{maxAge: 1000 * 60 * 60 * 24, httpOnly: true,signed: true});
                res.status(200).json({ message: 'Inicio de sesión exitoso', user });
            } else {
                res.status(404).json({ error: 'Usuario no encontrado o contraseña incorrecta' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }
    

                async logoutUser(req, res) {
        try {
            res.clearCookie('userId'); // Eliminar la cookie userId
            res.status(200).json({ message: 'Sesión cerrada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al cerrar sesión' });
        }
    }    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const deletedUser = await userDao.deleteUser(userId);
            res.status(200).json({ message: 'Usuario eliminado correctamente', user: deletedUser });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    }

    async editUser(req, res) {
        const userId = req.params.id;
        const userData = req.body;
        try {
            const updatedUser = await userDao.editUser(userId, userData);
            res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
        } catch (error) {
            res.status(500).json({ error: 'Error al editar el usuario' });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userDao.getAllUsers();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
        }
    }
    
}

export default new UserController();
