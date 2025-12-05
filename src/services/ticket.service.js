import { TicketRepository } from "../repositories/ticket.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { MessageRepository } from "../repositories/message.repository.js";
import { PRIORITY, TICKET_STATUS } from "../models/Ticket.js";

const ticketRepo = new TicketRepository();
const userRepo = new UserRepository();
const categoryRepo = new CategoryRepository();
const messageRepo = new MessageRepository();

class TicketService {
    // ------------------- CRUD -------------------
    async getAll({ userId, role }) {
        if (role === "ADMIN" || role === "AGENT") {
            return await ticketRepo.findAll(); // ven todos los tickets
        } else if (role === "USER") {
            return await ticketRepo.findAll({ where: { userId } }); // solo sus tickets
        } else {
            throw Object.assign(new Error("Rol inválido"), { status: 403 });
        }
    }

    async getById(id, { userId, role }) {
        const ticket = await ticketRepo.findById(id);
        if (!ticket) throw Object.assign(new Error("Ticket no encontrado"), { status: 404 });

        // Si es usuario normal, solo puede ver su ticket
        if (role === "USER" && ticket.userId !== userId) {
            throw Object.assign(new Error("No autorizado para ver este ticket"), { status: 403 });
        }

        return ticket;
    }

    async create({
        title,
        description,
        userId,
        categoryId,
        agentId = null,
        status = "OPEN",
        priority = "MEDIUM",
    }) {
        // Validar campos obligatorios
        if (!title || !description || !userId || !categoryId) {
            throw Object.assign(
                new Error("Campos obligatorios: title, description, userId, categoryId"),
                { status: 400 }
            );
        }

        // Validar usuario y categoría
        const user = await userRepo.findById(userId);
        if (!user) throw Object.assign(new Error("Usuario no encontrado"), { status: 404 });

        const category = await categoryRepo.findById(categoryId);
        if (!category) throw Object.assign(new Error("Categoría no encontrada"), { status: 404 });

        // Validar agente si se pasa
        if (agentId) {
            const agent = await userRepo.findById(agentId);
            if (!agent) throw Object.assign(new Error("Agente no encontrado"), { status: 404 });
        }

        // Validar enums
        if (!TICKET_STATUS.includes(status)) {
            throw Object.assign(
                new Error(`Status inválido. Valores permitidos: ${TICKET_STATUS.join(", ")}`),
                { status: 400 }
            );
        }

        if (!PRIORITY.includes(priority)) {
            throw Object.assign(
                new Error(`Priority inválida. Valores permitidos: ${PRIORITY.join(", ")}`),
                { status: 400 }
            );
        }

        return await ticketRepo.create({
            title,
            description,
            userId,
            categoryId,
            agentId,
            status,
            priority,
        });
    }

    async update(
        id,
        {
            title,
            description,
            categoryId,
            agentId,
            status,
            priority,
        }
    ) {
        const ticket = await ticketRepo.findById(id);
        if (!ticket) throw Object.assign(new Error("Ticket no encontrado"), { status: 404 });

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;

        if (categoryId !== undefined) {
            const category = await categoryRepo.findById(categoryId);
            if (!category) throw Object.assign(new Error("Categoría no encontrada"), { status: 404 });
            updateData.categoryId = categoryId;
        }

        if (agentId !== undefined) {
            const agent = await userRepo.findById(agentId);
            if (!agent) throw Object.assign(new Error("Agente no encontrado"), { status: 404 });
            updateData.agentId = agentId;
        }

        if (status !== undefined) {
            if (!TICKET_STATUS.includes(status)) {
                throw Object.assign(
                    new Error(`Status inválido. Valores permitidos: ${TICKET_STATUS.join(", ")}`),
                    { status: 400 }
                );
            }
            updateData.status = status;
        }

        if (priority !== undefined) {
            if (!PRIORITY.includes(priority)) {
                throw Object.assign(
                    new Error(`Priority inválida. Valores permitidos: ${PRIORITY.join(", ")}`),
                    { status: 400 }
                );
            }
            updateData.priority = priority;
        }

        return await ticketRepo.update(id, updateData);
    }

    async delete(id) {
        const ticket = await ticketRepo.findById(id);
        if (!ticket) throw Object.assign(new Error("Ticket no encontrado"), { status: 404 });
        return await ticketRepo.delete(id);
    }

    // ------------------- Mensajes -------------------
    async addMessage(ticketId, authorId, content) {
        const ticket = await this.getById(ticketId);
        const author = await userRepo.findById(authorId);
        if (!author) throw Object.assign(new Error("Autor no encontrado"), { status: 404 });

        return await messageRepo.create({
            ticketId: ticket.id,
            authorId: author.id,
            content,
        });
    }

    async getMessages(ticketId) {
        const ticket = await this.getById(ticketId);
        return await messageRepo.findByTicket(ticket.id);
    }
}

export default new TicketService();
