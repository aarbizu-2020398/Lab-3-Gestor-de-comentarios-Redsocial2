 
export const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                success: false,
                msg: "Se quiere verificar un rolo sin validar el token primero"
            })
        }
 
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                success: false,
                msg: `Usuario no autorizado, posee un rol ${req.usuario.role}, los roles autorizados son ${roles}`
            })
        }
        next();
 
    }
}

export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN_ROLE') {
      return res.status(403).json({ msg: 'No tienes permisos para realizar esta acción' });
    }
    next();
  };