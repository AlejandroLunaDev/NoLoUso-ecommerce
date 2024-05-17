import express from 'express';
import userController from '../controllers/userController.js';
import authenticateToken from '../../common/middleware/authMiddleware.js'; // Middleware de autenticación

const router = express.Router();

// Rutas de usuario protegidas por middleware de autenticación
router.delete('/:id', authenticateToken, userController.deleteUser);
router.put('/:id', authenticateToken, userController.editUser);
router.get('/', authenticateToken, userController.getAllUsers);

export default router;
