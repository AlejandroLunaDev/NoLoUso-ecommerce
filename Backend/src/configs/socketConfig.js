import { Server } from 'socket.io';
import socketHandler from "../common/utils/socketHandler.js";



export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "https://www.silouso.shop",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });

  // Manejar eventos de Socket.io
  socketHandler(io);

  return io;
};
