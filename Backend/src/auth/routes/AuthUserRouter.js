import express from 'express';
import authUserController from '../controllers/authUserController.js';
import authenticateToken from '../../common/middleware/authMiddleware.js'; // Middleware de autenticación

const router = express.Router();

// Rutas de autenticación
router.post('/register', authUserController.registerUser);
router.post('/refresh-token', authUserController.refreshToken.bind(authUserController));
router.post('/login', authUserController.loginUser.bind(authUserController));
router.post('/logout', authenticateToken, authUserController.logoutUser.bind(authUserController));

export default router;
