import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import messagesRouter from "./routes/messages.js";

// dotenv.config carga las variables de entorno en process.env
dotenv.config();

// Guardamos en variables las credenciales de entorno
const { MONGO_URI, API_PORT, APP_PORT} = process.env;

const app = express();
// Middleware para entender JSON
app.use(express.json());
//  autoriza al frontend a consumir la API (necesario cuando los servicios están separados)
app.use(cors({ origin: `http://localhost:${APP_PORT}`}));


// Conectamos a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error MongoDB:", err.message));

// API routes
app.use("/api/messages", messagesRouter);

app.listen(API_PORT, () => console.log(`API en http://localhost:${API_PORT}`));
