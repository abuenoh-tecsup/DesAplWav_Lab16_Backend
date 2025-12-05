// routes/category.routes.js
import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

// CRUD de categorías
router.get("/", categoryController.getAll);          // Obtener todas las categorías
router.get("/:id", categoryController.getById);     // Obtener categoría por id
router.post("/", categoryController.create);        // Crear nueva categoría
router.patch("/:id", categoryController.update);    // Actualizar categoría
router.delete("/:id", categoryController.delete);   // Eliminar categoría

export default router;
