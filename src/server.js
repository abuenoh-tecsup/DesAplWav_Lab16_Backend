import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Importar y sincronizar Sequelize
import { syncDB } from "./models/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Healthcheck
app.get("/health", (req, res) => res.status(200).json({ ok: true }));

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Error interno del servidor" });
});

// Sincronizar DB y levantar servidor
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await syncDB(); // Conexión y sincronización de tablas
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto ${PORT}`)
    );
  } catch (err) {
    console.error("No se pudo iniciar el servidor:", err);
    process.exit(1);
  }
};

startServer();
