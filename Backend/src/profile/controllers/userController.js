import userDao from '../dao/userDao.js';

class UserController {

    
    async deleteUser(req, res) {
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
