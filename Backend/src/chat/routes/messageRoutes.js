// messageRouter.js
import express from "express";
import { postMessage, getAllMessages, getUserMessages } from "../controllers/messageControler.js";  

const router = express.Router();

router.post("/", postMessage);
router.get("/", getAllMessages);
router.get("/:userId", getUserMessages);

export default router;
