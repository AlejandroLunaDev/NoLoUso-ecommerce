// auth/dao/authUserDao.js

import { userModel } from '../../profile/models/userModel.js';

class AuthUserDao {
    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('Error al buscar el usuario por correo electrónico');
        }
    }

    async createUser(userData) {
        try {
            const newUser = await userModel.create(userData);
            console.log('Usuario de autenticación creado con éxito:', newUser);
            return newUser;
        } catch (error) {
            console.error('Error al crear el usuario de autenticación:', error);
            throw new Error('Error al crear el usuario de autenticación');
        }
    }
}

export default new AuthUserDao();
