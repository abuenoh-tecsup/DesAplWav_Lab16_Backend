import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
  try {
    // 1️⃣ Intentar obtener token de header Authorization
    let token;
    const header = req.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      token = header.split(" ")[1];
    }

    // 2️⃣ Si no está en header, buscar en cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.sub;
    req.userRole = payload.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o caducado" });
  }
}
