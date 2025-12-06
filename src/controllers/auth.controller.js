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

      // Cookie correcta para Vercel + Render
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // HTTPS obligatorio en Render
        sameSite: "none",    // IMPORTANTE para evitar bloqueos
        maxAge: 1000 * 60 * 60,
      });

      return res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({ message: "Cierre de sesión exitoso" });
    } catch (err) {
      next(err);
    }
  }

}

export default new AuthController();
