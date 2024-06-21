import express from 'express';
import userController from '../controllers/userController.js';
import authenticateToken from '../../common/middleware/authMiddleware.js'; // Middleware de autenticación

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: User not found
 */
router.delete('/:id', authenticateToken, userController.deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The updated username of the user
 *               email:
 *                 type: string
 *                 description: The updated email of the user
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: User not found
 */
router.put('/:id', authenticateToken, userController.editUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of users
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Users not found
 */
router.get('/', authenticateToken, userController.getAllUsers);

export default router;
