import express from "express";
import logger from "morgan";
import config from "./configs/config.js";
import cors from "cors";
import { connectDB } from "./db/mongoDb.js";

// Importar rutas
import productRouter from "./routes/productsRouter.js";
/* import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js"; */

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

// Rutas
app.use("/api/products", productRouter);
/* app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter); */

// Servidor
app.listen(config.PORT, () => {
    console.log(`Servidor en ejecución en el puerto http://localhost:${config.PORT}`);
});
