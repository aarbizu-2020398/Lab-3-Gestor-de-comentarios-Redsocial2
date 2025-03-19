import { User } from '../users/user.model.js';

import bcrypt from 'bcryptjs';

export const getAll = async (req, res) => {
    try {

        const { limit = 20, skip = 0 } = req.query;
        const users = await User.find()
            .skip(Number(skip))
            .limit(Number(limit))
            .select('-password');

        if (users.length === 0) {
            return res.status(404).send({
                message: 'Users not found',
                success: false
            });
        }

        return res.send({
            success: true,
            message: 'Users found',
            users,
            total: users.length
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: 'General error',
            err
        });
    }
};

export const editarPerfil = async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { nombre, email },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export const eliminarPerfil = async (req, res) => {
    try {
        const userId = req.user.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};


export const createDefaultUsers = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN_ROLE' });
        if (existingAdmin) {
            console.log('Ya existe un administrador. No se puede crear otro.');
            return;
        }

        const defaultAdmin = {
            username: 'Admin',
            email: 'admin@example.com',
            password: await bcrypt.hash('admin123', 10),
            status: true,
            role: 'ADMIN_ROLE'
        };

        const admin = new User(defaultAdmin);
        await admin.save();
        console.log('Administrador por defecto creado:', admin);
    } catch (error) {
        console.error('Error al crear usuarios por defecto:', error.message);
    }
};
