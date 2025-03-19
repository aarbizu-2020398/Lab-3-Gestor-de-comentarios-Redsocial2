
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../users/user.model.js';

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios (email, password)'
      });
    }

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || 'clave_secreta',
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Login exitoso',
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error en el login',
      error: error.message
    });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
   
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios (username, email, password)'
      });
    }

  
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya se encuentra registrado' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const nuevoUsuario = await User.create({
      username,
      email,
      password: hashedPassword,
      status: true,          
      role: 'USER_ROLE'      
    });

    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: nuevoUsuario
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar el usuario',
      error: error.message
    });
  }
};
