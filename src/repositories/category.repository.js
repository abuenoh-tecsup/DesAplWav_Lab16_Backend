import { Category } from "../models/index.js";

export class CategoryRepository {
  async create(data) {
    return await Category.create(data);
  }

  async findById(id) {
    return await Category.findByPk(id);
  }

  async findAll() {
    return await Category.findAll();
  }

  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.destroy();
    return category;
  }
}
