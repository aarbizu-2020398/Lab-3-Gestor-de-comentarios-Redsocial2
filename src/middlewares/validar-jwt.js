import jwt from 'jsonwebtoken';
import { User } from '../users/user.model.js';

export const validarJWT = async (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (!usuario.status) {
      return res.status(401).json({ msg: 'Token no válido - Usuario con estado inactivo' });
    }

    req.user = usuario;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Token no válido' });
  }
};
