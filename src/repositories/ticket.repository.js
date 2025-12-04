import { Ticket, User, Category, Message } from "../models/index.js";

export class TicketRepository {
  async create(data) {
    return await Ticket.create(data, {
      include: [
        { model: User, as: "user" },
        { model: User, as: "agent" },
        { model: Category, as: "category" },
      ],
    });
  }

  async findById(id) {
    return await Ticket.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: User, as: "agent" },
        { model: Message, as: "messages" },
        { model: Category, as: "category" },
      ],
    });
  }

  async findAll() {
    return await Ticket.findAll({
      include: [
        { model: User, as: "user" },
        { model: User, as: "agent" },
        { model: Category, as: "category" },
      ],
    });
  }

  async update(id, data) {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return null;
    await ticket.update(data);
    return ticket;
  }

  async delete(id) {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return null;
    await ticket.destroy();
    return ticket;
  }
}
