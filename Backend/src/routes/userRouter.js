import express from 'express';
import userController from '../controllers/userControllerr.js';

const router = express.Router();


router.post('/register', userController.registerUser);


router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.editUser);

export default router;
