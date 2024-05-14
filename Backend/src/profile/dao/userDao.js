import { userModel } from '../models/userModel.js';


class UserDao {
    async createUser(userData) {
        try {
            const newUser = await userModel.create(userData);
            console.log('Usuario creado con éxito:', newUser); // Agregar log de usuario creado
            return newUser;
        } catch (error) {
            console.error('Error al crear el usuario:', error); // Log del error
            throw new Error('Error al crear el usuario'); // Agregar throw del error original
        }
    }
    

    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('Error al buscar el usuario por correo electrónico');
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new Error('Usuario no encontrado');
            }
            return deletedUser;
        } catch (error) {
            throw new Error('Error al eliminar el usuario');
        }
    }

    async editUser(userId, userData) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(userId, userData, { new: true });
            if (!updatedUser) {
                throw new Error('Usuario no encontrado');
            }
            return updatedUser;
        } catch (error) {
            throw new Error('Error al editar el usuario');
        }
    }

    async getAllUsers() {
        try {
            const users = await userModel.find().select('first_name last_name email online');
            return users;
        } catch (error) {
            throw new Error('Error al obtener la lista de usuarios');
        }
    }
    
}

export default new UserDao();
