// auth/routes/authUserRouter.js

import express from 'express';
import authUserController from '../controllers/authUserController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', authUserController.registerUser);
router.post('/login', authUserController.loginUser.bind(authUserController));

export default router;
