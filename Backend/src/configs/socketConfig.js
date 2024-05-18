import { Server } from 'socket.io';
import socketHandler from "../common/utils/socketHandler.js";

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ["https://no-lo-uso-ecommerce.vercel.app"]
  : ["http://localhost:5173"];

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });

  // Manejar eventos de Socket.io
  socketHandler(io);

  return io;
};
