// server.js
import express from "express";
import logger from "morgan";
import cors from "cors";
import passport from 'passport';
import { connectDB } from "./db/mongoDb.js";
import socketConfig from "./configs/socketConfig.js";
import config from './configs/config.js';
import dotenv from 'dotenv';
dotenv.config();
import cookiePrser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./configs/swaggerConfig.js";

// Import routes
import productRouter from "./product/routes/productsRouter.js";
import userRouter from "./profile/routes/userRouter.js";
import authRouter from "./auth/routes/AuthUserRouter.js";
import messageRouter from "./chat/routes/messageRoutes.js";
import cartRoutes from "./cart/routes/cartRouter.js";
import githubRoutes from './auth/github/routes/githubRoutes.js';
import googleRoutes from './auth/google/routes/googleRoutes.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = config.LOCAL_PORT;

console.log("Listening on port " + port);

const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${isProduction ? config.PRODUCTION_URL : `http://localhost:${port}`}`);
});

// Connect to the database
connectDB();

const origin = isProduction
  ? 'https://www.silouso.shop'
  : `http://localhost:5173`;
console.log(`Origin: ${origin}`);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors({
  origin: origin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(cookiePrser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Passport middleware
app.use(passport.initialize());

// Routes
app.use("/api/products", productRouter);
app.use('/api/carts', cartRoutes);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use(githubRoutes);
app.use(googleRoutes); 

// Configure Socket.io
socketConfig(httpServer);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
