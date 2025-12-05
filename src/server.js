import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import categoryRoutes from "./routes/category.routes.js";

import { syncDB } from "./models/index.js";

dotenv.config();

const app = express();

// --- CORS CONFIG ---
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/categories", categoryRoutes);

// Healthcheck
app.get("/health", (req, res) => res.status(200).json({ ok: true }));

// Handler global de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
});

// Server
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await syncDB();
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto ${PORT}`)
    );
  } catch (err) {
    console.error("No se pudo iniciar el servidor:", err);
    process.exit(1);
  }
};

startServer();
