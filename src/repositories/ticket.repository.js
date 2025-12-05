import { Ticket, User, Category, Message } from "../models/index.js";

export class TicketRepository {
  async create(data) {
    // No hace falta include aquí; solo usamos los IDs
    return await Ticket.create(data);
  }

  async findById(id) {
    return await Ticket.findByPk(id, {
      include: [
        { model: User, as: "user" },      // alias correcto
        { model: User, as: "agent" },     // alias correcto
        { model: Category },               // sin alias, porque así lo definiste
        { model: Message }                 // sin alias
      ],
    });
  }

  async findAll() {
    return await Ticket.findAll({
      include: [
        { model: User, as: "user" },
        { model: User, as: "agent" },
        { model: Category },               // sin alias
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
