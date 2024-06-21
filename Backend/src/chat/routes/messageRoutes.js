import express from "express";
import messageController from "../controllers/messageController.js"; // Asegúrate de importar la instancia

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for managing messages
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the message
 *               userId:
 *                 type: string
 *                 description: The ID of the user sending the message
 *     responses:
 *       '201':
 *         description: Message created successfully
 *       '400':
 *         description: Invalid request body
 */
router.post("/", messageController.postMessage.bind(messageController)); // Usar bind

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       '200':
 *         description: A list of messages
 *       '404':
 *         description: Messages not found
 */
router.get("/", messageController.getAllMessages.bind(messageController)); // Usar bind

/**
 * @swagger
 * /api/messages/{userId}:
 *   get:
 *     summary: Get messages by user ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user whose messages to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Messages retrieved successfully
 *       '404':
 *         description: Messages not found for the user
 */
router.get("/:userId", messageController.getUserMessages.bind(messageController)); // Usar bind

export default router;
