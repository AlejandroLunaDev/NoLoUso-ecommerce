import express from "express";
import logger from "morgan";
import config from "./configs/config.js";
import cors from "cors";
import { connectDB } from "./db/mongoDb.js";
import socketConfig from "./configs/socketConfig.js";
import dotenv from 'dotenv'

// Importar rutas
import productRouter from "./product/routes/productsRouter.js";
import userRouter from "./profile/routes/userRouter.js";
import authRouter from "./auth/routes/AuthUserRouter.js";
import messageRouter from "./chat/routes/messageRoutes.js";

dotenv.config();
const app = express();
const httpServer = app.listen(config.PORT, () => {
  console.log(`Servidor en ejecución en el puerto http://localhost:${config.PORT}`);
});

// Conectar a la base de datos
connectDB();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors({
  origin: "https://no-lo-uso-ecommerce.vercel.app/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));




// Rutas
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);


// Configurar Socket.io
socketConfig(httpServer);
