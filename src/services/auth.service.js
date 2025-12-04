import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository();

class AuthService {
  async signUp({ email, password, name, role = "USER" }) {
    // Verificar si existe el email
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const err = new Error("El email ya está registrado");
      err.status = 400;
      throw err;
    }

    // Encriptar password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10");
    const hashed = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const user = await userRepository.create({
      email,
      password: hashed,
      name,
      role, // como enum
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async signIn({ email, password }) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      const err = new Error("Credenciales inválidas");
      err.status = 401;
      throw err;
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      const err = new Error("Credenciales inválidas");
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    return { token };
  }
}

export default new AuthService();
