import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Message from "./models/Message.js";
import messagesRouter from "./routes/messages.js";

// 1. meta.url obtiene el nombre del archivo actual
// 2. fileURLToPath convierte el URL a una ruta de archivo
// 3. path.dirname obtiene el directorio padre del archivo actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Del directorio que obtuvimos antes vamos a salir a la raíz para
// encontrar el archivo .env
// 2. dotenv.config carga las variables de entorno en process.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Guardamos en variables las credenciales de entorno
const { MONGO_URI, API_PORT, APP_PORT} = process.env;

const app = express();
// Middleware para entender JSON
app.use(express.json());
//  autoriza al frontend a consumir la API
app.use(cors({ origin: `http://localhost:${APP_PORT}`}));


// Conectamos a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error MongoDB:", err.message));

// API routes
app.use("/api/messages", messagesRouter);;

app.listen(API_PORT, () => console.log(`API en http://localhost:${API_PORT}`));
