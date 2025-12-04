import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CategoryRepository {
  async create(data) {
    return prisma.category.create({ data });
  }

  async findById(id) {
    return prisma.category.findUnique({ where: { id } });
  }

  async findAll() {
    return prisma.category.findMany();
  }

  async update(id, data) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.category.delete({ where: { id } });
  }
}
