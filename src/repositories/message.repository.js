import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class MessageRepository {
  async create(data) {
    return prisma.message.create({
      data,
      include: {
        ticket: true,
        author: true,
      },
    });
  }

  async findById(id) {
    return prisma.message.findUnique({
      where: { id },
      include: {
        ticket: true,
        author: true,
      },
    });
  }

  async findByTicket(ticketId) {
    return prisma.message.findMany({
      where: { ticketId },
      include: {
        author: true,
      },
    });
  }

  async delete(id) {
    return prisma.message.delete({ where: { id } });
  }
}
