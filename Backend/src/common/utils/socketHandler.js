// socketHandler.js
import { createMessage } from "../../chat/dao/messageDao.js";

const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("joinRoom", (user) => {
      onlineUsers.set(socket.id, user);
      io.emit("userList", Array.from(onlineUsers.values()));
    });

    socket.on("chatMessage", async (messageData) => {
      try {
        const message = await createMessage(messageData);
        io.to(messageData.recipient).emit("chatMessage", message);
        io.to(messageData.sender).emit("chatMessage", message);
      } catch (error) {
        console.error("Error al enviar el mensaje: ", error);
      }
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      io.emit("userList", Array.from(onlineUsers.values()));
      console.log("Cliente desconectado");
    });
  });
};

export default socketHandler;
