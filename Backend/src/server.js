import express from "express";
import logger from "morgan";
import config from "./configs/config.js";
import cors from "cors";
import { connectDB } from "./db/mongoDb.js";
import socketConfig from "./configs/socketConfig.js";
import cookieParser from "cookie-parser";
import session from "express-session";
 // Agregamos la dependencia de seguridad Helmet

// Importar rutas
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";

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
app.use(cookieParser("CoderS3cR"));
app.use(session({
  secret: "CoderS3cR",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))



// Rutas
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

// Configurar Socket.io
socketConfig(httpServer);
