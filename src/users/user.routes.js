import express from 'express';
import { User } from './user.model.js';
import { validarJWT } from '../middlewares/validar-jwt.js';  
const router = express.Router();

router.put(
  '/:id',
  validarJWT,  
  async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    if (req.user._id.toString() !== id) {
      return res.status(403).json({ msg: 'No tienes permiso para actualizar este usuario' });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email }, 
        { new: true }
      ).select('-password');  

      if (!updatedUser) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al actualizar el usuario', error: error.message });
    }
  }
);

// Ruta para eliminar un usuario
router.delete(
  '/:id',
  validarJWT,  // Middleware que verifica el token
  async (req, res) => {
    const { id } = req.params;

    // Verificar que el usuario sea el que está eliminando su cuenta
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ msg: 'No tienes permiso para eliminar este usuario' });
    }

    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }

      res.status(200).json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al eliminar el usuario', error: error.message });
    }
  }
);

export default router;
