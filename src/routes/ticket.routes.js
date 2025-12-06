import express from "express";
import ticketController from "../controllers/ticket.controller.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

// CRUD básico
router.get("/", authenticate, authorize([]), ticketController.getAll);
router.get("/:id", authenticate, authorize([]), ticketController.getById);
router.post("/", authenticate, authorize([]), ticketController.create);
router.patch("/:id", authenticate, authorize(["AGENT", "ADMIN"]), ticketController.update);
router.delete("/:id", authenticate, authorize(["ADMIN"]), ticketController.delete);

// Mensajes de tickets
router.post("/:id/messages", authenticate, authorize([]), ticketController.addMessage);
router.get("/:id/messages", authenticate, authorize([]), ticketController.getMessages);

export default router;
