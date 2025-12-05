import ticketService from "../services/ticket.service.js";

class TicketController {
  // ------------------- CRUD -------------------
  async getAll(req, res, next) {
    try {
      const tickets = await ticketService.getAll();
      res.status(200).json(tickets);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const ticket = await ticketService.getById(req.params.id);
      res.status(200).json(ticket);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      // Explicitar campos esperados
      const { title, description, userId, categoryId, agentId, status, priority } = req.body;

      if (!title || !description || !userId || !categoryId) {
        return res.status(400).json({
          message: "Campos obligatorios: title, description, userId, categoryId",
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
      const { authorId, content } = req.body;

      if (!authorId || !content) {
        return res.status(400).json({
          message: "Campos obligatorios: authorId, content",
        });
      }

      const message = await ticketService.addMessage(req.params.id, authorId, content);
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
