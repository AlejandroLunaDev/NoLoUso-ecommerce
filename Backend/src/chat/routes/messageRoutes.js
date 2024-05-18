import express from "express";
import messageController from "../controllers/messageController.js"; // Asegúrate de importar la instancia

const router = express.Router();

router.post("/", messageController.postMessage.bind(messageController)); // Usar bind
router.get("/", messageController.getAllMessages.bind(messageController)); // Usar bind
router.get("/:userId", messageController.getUserMessages.bind(messageController)); // Usar bind

export default router;
