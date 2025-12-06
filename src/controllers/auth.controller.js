import authService from "../services/auth.service.js";

class AuthController {
  async signUp(req, res, next) {
    try {
      const { email, password, name, role } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email y password son requeridos" });
      }

      const user = await authService.signUp({ email, password, name, role });
      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email y password son requeridos" });
      }

      const { token } = await authService.signIn({ email, password });

      // Enviar token en cookie httpOnly
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS solo en prod
        sameSite: "strict",
        maxAge: 1000 * 60 * 60, // 1 hora, ajustar según necesidad
      });

      return res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    try {
      // Limpiar la cookie httpOnly
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(200).json({ message: "Cierre de sesión exitoso" });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
