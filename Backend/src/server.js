import express from "express";
import http from "http";
import { Server } from "socket.io";
import logger from "morgan";
import config from "./configs/config.js";
import cors from "cors";
import { connectDB } from "./db/mongoDb.js";

// Importar rutas
import productRouter from "./routes/productsRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

// Rutas
app.use("/api/products", productRouter);

// Socket.io events
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("message", "Bienvenido al servidor Socket.io");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Servidor HTTP y Socket.io
server.listen(config.PORT, () => {
  console.log(`Servidor en ejecución en el puerto http://localhost:${config.PORT}`);
});
