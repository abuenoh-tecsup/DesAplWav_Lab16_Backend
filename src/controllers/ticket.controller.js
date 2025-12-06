import ticketService from "../services/ticket.service.js";

class TicketController {
    // ------------------- CRUD -------------------
    async getAll(req, res, next) {
        try {
            const tickets = await ticketService.getAll({ userId: req.userId, role: req.userRole });
            res.status(200).json(tickets);
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const ticket = await ticketService.getById(req.params.id, { userId: req.userId, role: req.userRole });
            res.status(200).json(ticket);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            // Explicitar campos esperados
            const { title, description, categoryId, agentId, status, priority } = req.body;
            const userId = req.userId; // obtenemos el ID del usuario desde el JWT

            if (!title || !description || !categoryId) {
                return res.status(400).json({
                    message: "Campos obligatorios: title, description, categoryId",
                });
            }

            const ticket = await ticketService.create({ title, description, userId, categoryId, agentId, status, priority });
            res.status(201).json(ticket);
        } catch (err) {
            next(err);
        }
    }


    async update(req, res, next) {
        try {
            // Explicitar campos que se pueden modificar
            const { title, description, categoryId, agentId, status, priority } = req.body;
            const ticket = await ticketService.update(req.params.id, { title, description, categoryId, agentId, status, priority });
            res.status(200).json(ticket);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const ticket = await ticketService.delete(req.params.id);
            res.status(200).json(ticket);
        } catch (err) {
            next(err);
        }
    }

    // ------------------- Mensajes -------------------
    async addMessage(req, res, next) {
        try {
            const { content } = req.body;
            const authorId = req.userId;

            if (!content) {
                return res.status(400).json({
                    message: "El contenido del mensaje es obligatorio",
                });
            }

            // Llamamos al service pasando el authorId y content
            const message = await ticketService.addMessage(req.params.id, { authorId, content });

            res.status(201).json(message);
        } catch (err) {
            next(err);
        }
    }


    async getMessages(req, res, next) {
        try {
            const messages = await ticketService.getMessages(req.params.id);
            res.status(200).json(messages);
        } catch (err) {
            next(err);
        }
    }
}

export default new TicketController();
