import { CategoryRepository } from "../repositories/category.repository.js";

const categoryRepository = new CategoryRepository();

class CategoryService {
  async getAll() {
    return await categoryRepository.findAll();
  }

  async getById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      const err = new Error("Categoría no encontrada");
      err.status = 404;
      throw err;
    }
    return category;
  }

  async create({ name }) {
    if (!name) {
      throw Object.assign(new Error("El nombre de la categoría es obligatorio"), { status: 400 });
    }

    const existing = (await categoryRepository.findAll()).find(c => c.name === name);
    if (existing) {
      throw Object.assign(new Error("Ya existe una categoría con ese nombre"), { status: 400 });
    }

    return await categoryRepository.create({ name });
  }

  async update(id, { name }) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw Object.assign(new Error("Categoría no encontrada"), { status: 404 });
    }

    if (!name) {
      throw Object.assign(new Error("El nombre de la categoría es obligatorio"), { status: 400 });
    }

    const existing = (await categoryRepository.findAll())
      .find(c => c.name === name && c.id !== id);
    if (existing) {
      throw Object.assign(new Error("Ya existe otra categoría con ese nombre"), { status: 400 });
    }

    return await categoryRepository.update(id, { name });
  }

  async delete(id) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw Object.assign(new Error("Categoría no encontrada"), { status: 404 });
    }
    return await categoryRepository.delete(id);
  }
}

export default new CategoryService();
