import { Message, Ticket, User } from "../models/index.js";

export class MessageRepository {
  async create(data) {
    return await Message.create(data, {
      include: [
        { model: Ticket, as: "ticket" },
        { model: User, as: "author" },
      ],
    });
  }

  async findById(id) {
    return await Message.findByPk(id, {
      include: [
        { model: Ticket, as: "ticket" },
        { model: User, as: "author" },
      ],
    });
  }

  async findByTicket(ticketId) {
    return await Message.findAll({
      where: { ticketId },
      include: [
        { model: User, as: "author" }
      ],
    });
  }

  async delete(id) {
    const message = await Message.findByPk(id);
    if (!message) return null;
    await message.destroy();
    return message;
  }
}
