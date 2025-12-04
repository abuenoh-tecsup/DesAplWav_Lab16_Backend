import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TicketRepository {
  async create(data) {
    return prisma.ticket.create({
      data,
      include: {
        user: true,
        agent: true,
        category: true,
      },
    });
  }

  async findById(id) {
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        agent: true,
        messages: true,
        category: true,
      },
    });
  }

  async findAll() {
    return prisma.ticket.findMany({
      include: {
        user: true,
        agent: true,
        category: true,
      },
    });
  }

  async update(id, data) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.ticket.delete({ where: { id } });
  }
}
