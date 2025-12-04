export default function authorize(requiredRoles = []) {
  return (req, res, next) => {
    if (!req.userRole)
      return res.status(401).json({ message: "No autorizado" });

    if (requiredRoles.length > 0 && !requiredRoles.includes(req.userRole)) {
      return res.status(403).json({ message: "Prohibido: permisos insuficientes" });
    }

    next();
  };
}
