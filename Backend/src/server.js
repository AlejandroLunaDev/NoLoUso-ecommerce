import express from "express";
import logger from "morgan";
import config from "./configs/config.js";
import cors from "cors";
import { connectDB } from "./db/mongoDb.js";
import socketConfig from "./configs/socketConfig.js";
import AuthUserRouter from "./auth/routes/AuthUserRouter.js";


// Importar rutas
import productRouter from "./product/routes/productsRouter.js";
import userRouter from "./profile/routes/userRouter.js";


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
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));




// Rutas
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", AuthUserRouter);


// Configurar Socket.io
socketConfig(httpServer);
