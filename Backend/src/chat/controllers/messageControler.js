// messageController.js
import { createMessage, getMessages, getMessagesByUser } from "../dao/messageDao.js";

export const postMessage = async (req, res) => {
    try {
        const message = await createMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const messages = await getMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await getMessagesByUser(userId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
