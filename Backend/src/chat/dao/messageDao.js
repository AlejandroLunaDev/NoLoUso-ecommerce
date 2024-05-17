// messageDao.js
import { messageModel } from "../models/messageModel.js";

export const createMessage = async (messageData) => {
    try {
        const message = new messageModel(messageData);
        await message.save();
        return message;
    } catch (error) {
        throw new Error("Error al crear el mensaje: " + error.message);
    }
};

export const getMessages = async () => {
    try {
        return await messageModel.find().populate("sender").populate("recipient");
    } catch (error) {
        throw new Error("Error al obtener los mensajes: " + error.message);
    }
};

export const getMessagesByUser = async (userId) => {
    try {
        return await messageModel.find({
            $or: [{ sender: userId }, { recipient: userId }]
        }).populate("sender").populate("recipient");
    } catch (error) {
        throw new Error("Error al obtener los mensajes del usuario: " + error.message);
    }
};
