import express from "express";
import ticketController from "../controllers/ticket.controller.js";

const router = express.Router();

// CRUD básico
router.get("/", ticketController.getAll);
router.get("/:id", ticketController.getById);
router.post("/", ticketController.create);
router.patch("/:id", ticketController.update);
router.delete("/:id", ticketController.delete);

// Mensajes de tickets
router.post("/:id/messages", ticketController.addMessage);
router.get("/:id/messages", ticketController.getMessages);

export default router;
