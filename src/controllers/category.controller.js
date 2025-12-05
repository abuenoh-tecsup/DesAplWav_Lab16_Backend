import categoryService from "../services/category.service.js";

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const category = await categoryService.getById(req.params.id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "El nombre de la categoría es obligatorio" });
      }

      const category = await categoryService.create({ name });
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "El nombre de la categoría es obligatorio" });
      }

      const category = await categoryService.update(req.params.id, { name });
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const category = await categoryService.delete(req.params.id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
