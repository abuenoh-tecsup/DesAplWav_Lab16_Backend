import { Message, Ticket, User } from "../models/index.js";

export class MessageRepository {
  async create(data) {
    const message = await Message.create(data);
    return await Message.findByPk(message.id, {
      include: [{ model: User, as: "author" }],
    });
  }


  async findById(id) {
    return await Message.findByPk(id, {
      include: [
        { model: Ticket },             // coincide con la relación definida sin alias
        { model: User, as: "author" }, // coincide con el alias "author"
      ],
    });
  }

  async findByTicket(ticketId) {
    return await Message.findAll({
      where: { ticketId },
      include: [
        { model: User, as: "author" }  // solo el autor
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
