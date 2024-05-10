import { Server } from 'socket.io';
import socketHandler from "../utils/socketHandler.js";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });

  // Manejar eventos de Socket.io
  socketHandler(io);

  return io;
};
