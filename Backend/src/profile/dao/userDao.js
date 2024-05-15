import { userModel } from '../models/userModel.js';

class UserDao {
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
