import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository();

class UserService {
  async getAll() {
    return userRepository.findAll();
  }

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      throw err;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}

export default new UserService();
